'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText, useAdminResource } from '@/hooks/useAdminResource';
import { adminFetch } from '@/lib/adminApi';

interface TrustVote {
  id: string;
  createdAt: string;
  revokedAt: string | null;
  voter: { id: string; realName: string | null; phoneNumber: string; createdAt: string };
}

const time = (value: string) => new Date(value).toLocaleString('vi-VN');

// Phiếu tin tưởng 1 người nhận được. Huỷ phiếu = rút hộ người bỏ phiếu, số người tin tưởng và bảng thưởng trừ theo.
export function TrustVotesPanel({ userId, reason }: { userId: string; reason: string }) {
  const errorText = useAdminErrorText();
  const { data, error, reload } = useAdminResource<TrustVote[]>(
    `/api/admin/users/${userId}/trust-votes`,
  );
  const [actionError, setActionError] = React.useState<string | null>(null);
  const revoke = async (voteId: string) => {
    setActionError(null);
    try {
      await adminFetch(`/api/admin/trust-votes/${voteId}/revoke`, {
        method: 'POST',
        body: JSON.stringify({ reason: reason.trim() }),
      });
      await reload();
    } catch (err) {
      setActionError(errorText(err));
    }
  };
  return (
    <section className="border-border bg-background mb-6 rounded-lg border p-4">
      <h2 className="mb-3 text-sm font-semibold">Phiếu tin tưởng nhận được</h2>
      <AdminError message={error ?? actionError} />
      {data?.length === 0 ? <p className="text-sm text-stone-600">Chưa có phiếu nào.</p> : null}
      {data?.map((vote) => (
        <div
          key={vote.id}
          className="flex items-center gap-3 border-t border-stone-100 py-2 text-sm"
        >
          <div className="flex-1">
            <div className="font-semibold">{vote.voter.realName ?? 'Chưa có tên'}</div>
            <div className="text-xs text-stone-600">
              {vote.voter.phoneNumber} · bỏ phiếu {time(vote.createdAt)} · tài khoản tạo{' '}
              {time(vote.voter.createdAt)}
            </div>
          </div>
          {vote.revokedAt ? (
            <span className="text-xs text-stone-500">Đã rút {time(vote.revokedAt)}</span>
          ) : (
            <button
              type="button"
              disabled={reason.trim().length < 5}
              onClick={() => void revoke(vote.id)}
              className="border-border rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-40"
            >
              Huỷ phiếu
            </button>
          )}
        </div>
      ))}
    </section>
  );
}
