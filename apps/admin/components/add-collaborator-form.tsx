'use client';

import * as React from 'react';

import type { UserLookupResult } from '@/hooks/useCollaboratorActions';

// Thêm cộng tác viên (tài liệu bổ sung, thảo luận 2026-08-17) — CTV đã tự đăng ký tài khoản thật
// qua OTP từ trước, ở đây chỉ tra SĐT (tái dùng route lookup của mục 95) rồi đánh dấu.
export function AddCollaboratorForm({
  onLookup,
  onMark,
  saving,
}: {
  onLookup: (phone: string) => Promise<UserLookupResult | null>;
  onMark: (userId: string) => void;
  saving: boolean;
}) {
  const [phone, setPhone] = React.useState('');
  const [found, setFound] = React.useState<UserLookupResult | null>(null);
  const [searching, setSearching] = React.useState(false);

  return (
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="text-sm font-semibold">Thêm cộng tác viên</div>
      <div className="mt-2.5 flex gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="SĐT tài khoản đã đăng ký..."
          className="border-border flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="button"
          disabled={!phone.trim() || searching}
          onClick={async () => {
            setSearching(true);
            setFound(await onLookup(phone));
            setSearching(false);
          }}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {searching ? 'Đang tìm…' : 'Tìm'}
        </button>
      </div>

      {found ? (
        <div className="mt-2.5 flex items-center justify-between gap-2 rounded-md bg-stone-50 px-3 py-2 text-sm">
          <span>
            {found.alias} ·{' '}
            <span className="font-mono text-xs text-stone-600">{found.phoneNumber}</span>
          </span>
          <button
            type="button"
            disabled={saving}
            onClick={() => {
              onMark(found.id);
              setFound(null);
              setPhone('');
            }}
            className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium disabled:opacity-50"
          >
            Đánh dấu là CTV
          </button>
        </div>
      ) : null}
    </div>
  );
}
