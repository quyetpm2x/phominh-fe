'use client';

import * as React from 'react';

// Tin nhắn bị report là nội dung riêng tư: bắt buộc ghi lý do trước khi xem.
export function RevealForm({
  pending,
  onReveal,
}: {
  pending: boolean;
  onReveal: (reason: string) => void;
}) {
  const [reason, setReason] = React.useState('');
  const canSubmit = reason.trim().length >= 5;

  return (
    <div className="border-admin-amber-soft-border bg-admin-amber-soft rounded-md border p-3">
      <div className="text-admin-amber-text text-xs leading-relaxed">
        Nội dung riêng tư — bắt buộc ghi lý do trước khi xem. Mọi lượt mở đều được ghi log.
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Lý do cần xem (tối thiểu 5 ký tự)"
          className="border-border h-9 flex-1 rounded-md border bg-white px-3 text-xs"
        />
        <button
          type="button"
          disabled={!canSubmit || pending}
          onClick={() => onReveal(reason.trim())}
          className="h-9 rounded-md bg-stone-900 px-3 text-xs font-semibold text-white disabled:opacity-50"
        >
          Mở nội dung
        </button>
      </div>
    </div>
  );
}
