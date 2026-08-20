'use client';

import * as React from 'react';

import { Pill } from '@/components/pill';
import {
  useAccountLock,
  type AccountStatus,
  type AdminUserLookupResult,
} from '@/hooks/useAccountLock';
import type { Tone } from '@/lib/types';

const STATUS_LABEL: Record<AccountStatus, string> = {
  active: 'Đang hoạt động',
  restricted: 'Đang hạn chế',
  banned: 'Đã khoá',
};

const STATUS_TONE: Record<AccountStatus, Tone> = {
  active: 'ok',
  restricted: 'warn',
  banned: 'bad',
};

const DAY_MS = 24 * 60 * 60 * 1000;

// Khóa/mở khóa tài khoản — C5 (tai-lieu-chuc-nang.md #95). Trước đây chỉ là SpecPlaceholder dù
// PATCH admin/users/:id/status đã chạy thật — thiếu đúng 1 khâu: cách tìm ra userId cần khoá.
export default function UsersC5Page() {
  const { result, error, loading, applying, lookup, applyStatus } = useAccountLock();
  const [query, setQuery] = React.useState('');
  const [reason, setReason] = React.useState('');

  return (
    <div className="max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void lookup(query);
        }}
        className="flex gap-2"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SĐT hoặc mã tài khoản"
          className="border-border flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Đang tìm…' : 'Tìm'}
        </button>
      </form>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mt-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      {result ? (
        <UserPanel
          result={result}
          reason={reason}
          setReason={setReason}
          applying={applying}
          onApply={(status, restrictedUntil) => void applyStatus(status, reason, restrictedUntil)}
        />
      ) : null}
    </div>
  );
}

function UserPanel({
  result,
  reason,
  setReason,
  applying,
  onApply,
}: {
  result: AdminUserLookupResult;
  reason: string;
  setReason: (v: string) => void;
  applying: boolean;
  onApply: (status: AccountStatus, restrictedUntil?: string) => void;
}) {
  return (
    <div className="border-border bg-background mt-4 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{result.alias}</span>
        <span className="text-sm text-stone-600">{result.phoneNumber}</span>
        <Pill tone={STATUS_TONE[result.accountStatus]}>{STATUS_LABEL[result.accountStatus]}</Pill>
      </div>
      <div className="mt-1 text-xs text-stone-600">
        {result.realName ? `Tên thật: ${result.realName} · ` : ''}Điểm E1: {result.trustScoreE1} ·
        Tham gia {new Date(result.createdAt).toLocaleDateString('vi-VN')}
      </div>
      {result.statusReason ? (
        <div className="mt-1.5 text-xs text-stone-700">
          Lý do hiện tại: {result.statusReason}
          {result.restrictedUntil
            ? ` — tới ${new Date(result.restrictedUntil).toLocaleString('vi-VN')}`
            : ''}
        </div>
      ) : null}

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Lý do (bắt buộc khi khoá/hạn chế) — hiện cho chính user xem"
        className="border-border mt-3 w-full rounded-md border px-3 py-2 text-sm"
        rows={2}
      />

      <ActionButtons result={result} reason={reason} applying={applying} onApply={onApply} />
    </div>
  );
}

function ActionButtons({
  result,
  reason,
  applying,
  onApply,
}: {
  result: AdminUserLookupResult;
  reason: string;
  applying: boolean;
  onApply: (status: AccountStatus, restrictedUntil?: string) => void;
}) {
  const needsReason = !reason.trim();
  const btnClass =
    'rounded-md border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium disabled:opacity-50';

  if (result.accountStatus !== 'active') {
    return (
      <div className="mt-3">
        <button
          type="button"
          disabled={applying}
          onClick={() => onApply('active')}
          className={btnClass}
        >
          Mở lại
        </button>
      </div>
    );
  }
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        disabled={applying || needsReason}
        onClick={() => onApply('restricted', new Date(Date.now() + 7 * DAY_MS).toISOString())}
        className={btnClass}
      >
        Hạn chế 7 ngày
      </button>
      <button
        type="button"
        disabled={applying || needsReason}
        onClick={() => onApply('restricted', new Date(Date.now() + 30 * DAY_MS).toISOString())}
        className={btnClass}
      >
        Hạn chế 30 ngày
      </button>
      <button
        type="button"
        disabled={applying || needsReason}
        onClick={() => onApply('banned')}
        className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-md border px-2.5 py-1.5 text-xs font-medium disabled:opacity-50"
      >
        Khoá vĩnh viễn
      </button>
    </div>
  );
}
