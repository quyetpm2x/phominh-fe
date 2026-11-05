'use client';

import * as React from 'react';

import { AdminUserPicker } from '@/components/admin-user-picker';
import { TrustVotesPanel } from '@/components/trust-votes-panel';
import { UserSessionsPanel } from '@/components/user-sessions-panel';
import type { AdminUserListItem } from '@/hooks/useAdminUsers';

// Phiếu tin tưởng và phiên đăng nhập của 1 người. Mọi thao tác huỷ / thu hồi dùng chung 1 ô lý do và ghi nhật ký thao tác (A4).
export default function UsersC8Page() {
  const [user, setUser] = React.useState<AdminUserListItem | null>(null);
  const [reason, setReason] = React.useState('');
  return (
    <div className="max-w-3xl">
      <AdminUserPicker onPick={setUser} />
      {user ? (
        <>
          <p className="mb-3 text-sm">
            Đang xem: <span className="font-semibold">{user.name}</span> · {user.phoneNumber}
          </p>
          <label className="mb-4 block text-sm font-semibold">
            Lý do thao tác (ít nhất 5 ký tự, bắt buộc để huỷ hoặc thu hồi)
            <input
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="border-border mt-1 w-full rounded-md border px-3 py-2 text-sm font-normal"
            />
          </label>
          <TrustVotesPanel userId={user.id} reason={reason} />
          <UserSessionsPanel userId={user.id} reason={reason} />
        </>
      ) : null}
    </div>
  );
}
