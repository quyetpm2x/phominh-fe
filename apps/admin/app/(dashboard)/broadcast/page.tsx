'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText, useAdminResource } from '@/hooks/useAdminResource';
import type { PilotAreaItem } from '@/hooks/usePilotAreas';
import { adminFetch } from '@/lib/adminApi';

const inputClass = 'border-border mt-1 w-full rounded-md border px-3 py-2 text-sm font-normal';

// Thông báo hàng loạt: bắt buộc xem trước số người nhận rồi mới gửi được, tránh bấm nhầm gửi cho cả hệ thống.
function useBroadcast() {
  const errorText = useAdminErrorText();
  const { data: areas } = useAdminResource<PilotAreaItem[]>('/api/admin/pilot-areas');
  const [areaId, setAreaId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [preview, setPreview] = React.useState<number | null>(null);
  const [sent, setSent] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const audience = areaId ? { pilotAreaId: areaId } : {};
  const call = async (path: string, payload: object) => {
    setError(null);
    try {
      return await adminFetch<{ recipients: number }>(path, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      setError(errorText(err));
      return null;
    }
  };
  const runPreview = async () => {
    setSent(null);
    const res = await call('/api/admin/broadcast/preview', audience);
    if (res) setPreview(res.recipients);
  };
  const send = async () => {
    const res = await call('/api/admin/broadcast', {
      ...audience,
      title: title.trim(),
      body: body.trim(),
    });
    if (!res) return;
    setSent(res.recipients);
    setPreview(null);
    setTitle('');
    setBody('');
  };
  return {
    areas,
    areaId,
    setAreaId,
    title,
    setTitle,
    body,
    setBody,
    preview,
    setPreview,
    sent,
    error,
    runPreview,
    send,
  };
}

export default function BroadcastPage() {
  const form = useBroadcast();
  const ready = form.title.trim().length >= 3 && form.body.trim().length >= 3;
  const { preview, sent } = form;
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <AdminError message={form.error} />
      <BroadcastFields form={form} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={!ready}
          onClick={() => void form.runPreview()}
          className="border-border rounded-md border px-4 py-2 text-xs font-semibold disabled:opacity-40"
        >
          Xem số người nhận
        </button>
        <button
          type="button"
          disabled={!ready || preview === null || preview === 0}
          onClick={() => void form.send()}
          className="rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          {preview === null ? 'Gửi' : `Gửi tới ${preview.toLocaleString('vi-VN')} người`}
        </button>
      </div>
      {sent !== null ? (
        <p className="text-sm text-stone-700">
          Đã bắt đầu gửi tới {sent.toLocaleString('vi-VN')} người. Đợt lớn có thể mất vài phút. Đã
          ghi vào nhật ký thao tác.
        </p>
      ) : null}
    </div>
  );
}

function BroadcastFields({ form }: { form: ReturnType<typeof useBroadcast> }) {
  return (
    <>
      <label className="text-sm font-semibold">
        Người nhận
        <select
          value={form.areaId}
          onChange={(event) => {
            form.setAreaId(event.target.value);
            form.setPreview(null);
          }}
          className={inputClass}
        >
          <option value="">Toàn bộ người dùng đang hoạt động</option>
          {form.areas?.map((area) => (
            <option key={area.id} value={area.id}>
              Có Nhà / Chỗ làm trong khu {area.name}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold">
        Tiêu đề (3–80 ký tự)
        <input
          value={form.title}
          maxLength={80}
          onChange={(event) => form.setTitle(event.target.value)}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-semibold">
        Nội dung (3–300 ký tự)
        <textarea
          value={form.body}
          maxLength={300}
          rows={4}
          onChange={(event) => form.setBody(event.target.value)}
          className={inputClass}
        />
      </label>
    </>
  );
}
