'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText, useAdminResource } from '@/hooks/useAdminResource';
import { adminFetch } from '@/lib/adminApi';

interface UserSession {
  id: string;
  createdAt: string;
  expiresAt: string;
  kind: 'session' | 'quick_login';
}

const KIND_LABEL = { session: 'Phiên đăng nhập', quick_login: 'Đăng nhập nhanh (7 ngày)' } as const;
const time = (value: string) => new Date(value).toLocaleString('vi-VN');

// Các phiên còn hiệu lực của 1 người. Thu hồi xong máy đó chỉ dùng tiếp được tới khi access token hết hạn (tối đa 30 phút).
export function UserSessionsPanel({ userId, reason }: { userId: string; reason: string }) {
  const errorText = useAdminErrorText();
  const base = `/api/admin/users/${userId}/sessions`;
  const { data, error, reload } = useAdminResource<UserSession[]>(base);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const noReason = reason.trim().length < 5;
  const post = async (path: string) => {
    setActionError(null);
    try {
      await adminFetch(path, { method: 'POST', body: JSON.stringify({ reason: reason.trim() }) });
      await reload();
    } catch (err) {
      setActionError(errorText(err));
    }
  };
  return (
    <section className="border-border bg-background rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Phiên đăng nhập còn hiệu lực</h2>
        <button
          type="button"
          disabled={noReason || !data?.length}
          onClick={() => void post(`${base}/revoke-all`)}
          className="border-admin-red-soft-border text-admin-red rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
        >
          Thu hồi tất cả
        </button>
      </div>
      <AdminError message={error ?? actionError} />
      {data?.length === 0 ? <p className="text-sm text-stone-600">Không có phiên nào.</p> : null}
      {data?.map((session) => (
        <div
          key={session.id}
          className="flex items-center gap-3 border-t border-stone-100 py-2 text-sm"
        >
          <div className="flex-1">
            <div className="font-semibold">{KIND_LABEL[session.kind]}</div>
            <div className="text-xs text-stone-600">
              Cấp {time(session.createdAt)} · hết hạn {time(session.expiresAt)}
            </div>
          </div>
          <button
            type="button"
            disabled={noReason}
            onClick={() => void post(`${base}/${session.id}/revoke`)}
            className="border-border rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
          >
            Thu hồi
          </button>
        </div>
      ))}
    </section>
  );
}
