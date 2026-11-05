'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText } from '@/hooks/useAdminResource';
import { adminFetch } from '@/lib/adminApi';

interface RevealResult {
  wasAnonymous: boolean;
  id: string;
  realName: string | null;
  nickname: string | null;
  phoneNumber: string;
}

const inputClass = 'border-border w-full rounded-md border px-3 py-2 text-sm';

// Tra cứu danh tính sau bài / bình luận ẩn danh: bắt buộc ghi lý do, mỗi lần tra đều ghi vào log truy cập dữ liệu (F3).
export default function UsersC7Page() {
  const errorText = useAdminErrorText();
  const [type, setType] = React.useState<'post' | 'comment'>('post');
  const [id, setId] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [result, setResult] = React.useState<RevealResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const canSubmit = id.trim().length > 0 && reason.trim().length >= 5 && !loading;
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(
        await adminFetch<RevealResult>('/api/admin/anonymous-identity/reveal', {
          method: 'POST',
          body: JSON.stringify({ type, id: id.trim(), reason: reason.trim() }),
        }),
      );
    } catch (err) {
      setError(errorText(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl">
      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Chỉ tra cứu khi có lý do chính đáng (vi phạm nghiêm trọng, yêu cầu của cơ quan chức năng).
        Mỗi lần tra đều được lưu lại kèm tên bạn và lý do.
      </div>
      <form onSubmit={(event) => void submit(event)} className="flex flex-col gap-3">
        <RevealFields
          type={type}
          setType={setType}
          id={id}
          setId={setId}
          reason={reason}
          setReason={setReason}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="self-start rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Đang tra…' : 'Tra cứu'}
        </button>
      </form>
      <div className="mt-4">
        <AdminError message={error} />
      </div>
      {result ? <RevealedAuthor result={result} /> : null}
    </div>
  );
}

function RevealFields(props: {
  type: 'post' | 'comment';
  setType: (type: 'post' | 'comment') => void;
  id: string;
  setId: (id: string) => void;
  reason: string;
  setReason: (reason: string) => void;
}) {
  return (
    <>
      <label className="text-sm font-semibold">
        Loại nội dung
        <select
          value={props.type}
          onChange={(event) => props.setType(event.target.value as 'post' | 'comment')}
          className={`${inputClass} mt-1 font-normal`}
        >
          <option value="post">Bài đăng</option>
          <option value="comment">Bình luận</option>
        </select>
      </label>
      <label className="text-sm font-semibold">
        Mã nội dung
        <input
          value={props.id}
          onChange={(event) => props.setId(event.target.value)}
          className={`${inputClass} mt-1 font-normal`}
        />
      </label>
      <label className="text-sm font-semibold">
        Lý do tra cứu (ít nhất 5 ký tự)
        <textarea
          value={props.reason}
          onChange={(event) => props.setReason(event.target.value)}
          rows={3}
          className={`${inputClass} mt-1 font-normal`}
        />
      </label>
    </>
  );
}

function RevealedAuthor({ result }: { result: RevealResult }) {
  return (
    <dl className="border-border bg-background mt-2 rounded-lg border p-4 text-sm">
      {!result.wasAnonymous ? (
        <p className="mb-2 text-stone-600">
          Nội dung này không ẩn danh, người viết đã công khai tên.
        </p>
      ) : null}
      <dt className="font-semibold">Tên thật</dt>
      <dd className="mb-2">{result.realName ?? '—'}</dd>
      <dt className="font-semibold">Biệt danh</dt>
      <dd className="mb-2">{result.nickname ?? '—'}</dd>
      <dt className="font-semibold">Số điện thoại</dt>
      <dd className="mb-2">{result.phoneNumber}</dd>
      <dt className="font-semibold">Mã tài khoản</dt>
      <dd className="font-mono text-xs">{result.id}</dd>
    </dl>
  );
}
