'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText, useAdminResource } from '@/hooks/useAdminResource';
import { adminFetch } from '@/lib/adminApi';

const inputClass = 'border-border w-full rounded-md border px-3 py-2 text-sm';
const buttonClass =
  'rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-40';

function useTotp() {
  const errorText = useAdminErrorText();
  const { data, error, reload } = useAdminResource<{ enabled: boolean }>('/api/admin/me/2fa');
  const [setup, setSetup] = React.useState<{ secret: string; uri: string } | null>(null);
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [actionError, setActionError] = React.useState<string | null>(null);
  const post = async <T,>(path: string, payload: object = {}): Promise<T | null> => {
    setActionError(null);
    try {
      return await adminFetch<T>(path, { method: 'POST', body: JSON.stringify(payload) });
    } catch (err) {
      setActionError(errorText(err));
      return null;
    }
  };
  const finish = async () => {
    setSetup(null);
    setCode('');
    setPassword('');
    await reload();
  };
  const enable = async () => {
    if (await post('/api/admin/me/2fa/enable', { code: code.trim() })) await finish();
  };
  const disable = async () => {
    if (await post('/api/admin/me/2fa/disable', { password, code: code.trim() })) await finish();
  };
  const requestSetup = async () => {
    setSetup(await post<{ secret: string; uri: string }>('/api/admin/me/2fa/setup'));
  };
  return {
    data,
    error,
    setup,
    requestSetup,
    code,
    setCode,
    password,
    setPassword,
    actionError,
    enable,
    disable,
  };
}

// Xác thực 2 lớp của chính admin đang đăng nhập: thêm secret vào app xác thực, nhập đúng 1 mã mới có hiệu lực.
export default function AdminSecurityPage() {
  const {
    data,
    error,
    setup,
    requestSetup,
    code,
    setCode,
    password,
    setPassword,
    actionError,
    enable,
    disable,
  } = useTotp();
  if (error) return <AdminError message={error} />;
  if (!data) return <div className="text-sm text-stone-600">Đang tải…</div>;
  return (
    <div className="flex max-w-lg flex-col gap-3 text-sm">
      <AdminError message={actionError} />
      <p>
        Xác thực 2 lớp đang <span className="font-semibold">{data.enabled ? 'bật' : 'tắt'}</span>.
      </p>
      {!data.enabled && !setup ? (
        <button
          type="button"
          className={`${buttonClass} self-start`}
          onClick={() => void requestSetup()}
        >
          Bắt đầu cài đặt
        </button>
      ) : null}
      {setup ? (
        <SetupPanel
          secret={setup.secret}
          code={code}
          setCode={setCode}
          onEnable={() => void enable()}
        />
      ) : null}
      {data.enabled ? (
        <DisablePanel
          code={code}
          setCode={setCode}
          password={password}
          setPassword={setPassword}
          onDisable={() => void disable()}
        />
      ) : null}
    </div>
  );
}

function SetupPanel(props: {
  secret: string;
  code: string;
  setCode: (v: string) => void;
  onEnable: () => void;
}) {
  return (
    <div className="border-border rounded-lg border p-4">
      <p className="mb-2">
        Trong Google Authenticator hoặc Authy, chọn nhập khoá thủ công và dán khoá này:
      </p>
      <code className="mb-3 block break-all rounded bg-stone-100 p-2 text-xs">{props.secret}</code>
      <label className="font-semibold">
        Mã 6 số từ app
        <input
          value={props.code}
          onChange={(event) => props.setCode(event.target.value)}
          className={`${inputClass} mt-1`}
        />
      </label>
      <button
        type="button"
        disabled={props.code.trim().length !== 6}
        onClick={props.onEnable}
        className={`${buttonClass} mt-3`}
      >
        Bật xác thực 2 lớp
      </button>
    </div>
  );
}

function DisablePanel(props: {
  code: string;
  setCode: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  onDisable: () => void;
}) {
  return (
    <div className="border-border flex flex-col gap-2 rounded-lg border p-4">
      <p>Muốn tắt, nhập lại mật khẩu và mã hiện tại.</p>
      <input
        type="password"
        placeholder="Mật khẩu"
        value={props.password}
        onChange={(event) => props.setPassword(event.target.value)}
        className={inputClass}
      />
      <input
        placeholder="Mã 6 số"
        value={props.code}
        onChange={(event) => props.setCode(event.target.value)}
        className={inputClass}
      />
      <button
        type="button"
        disabled={!props.password || props.code.trim().length !== 6}
        onClick={props.onDisable}
        className={`${buttonClass} self-start`}
      >
        Tắt xác thực 2 lớp
      </button>
    </div>
  );
}
