'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText } from '@/hooks/useAdminResource';
import type { AdminUserListItem } from '@/hooks/useAdminUsers';
import { adminFetch } from '@/lib/adminApi';

// Tìm 1 người dùng theo SĐT hoặc tên rồi chọn, dùng chung cho các màn thao tác trên 1 tài khoản.
export function AdminUserPicker({ onPick }: { onPick: (user: AdminUserListItem) => void }) {
  const errorText = useAdminErrorText();
  const [query, setQuery] = React.useState('');
  const [items, setItems] = React.useState<AdminUserListItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const res = await adminFetch<{ items: AdminUserListItem[] }>(
        `/api/admin/users?query=${encodeURIComponent(query.trim())}`,
      );
      setItems(res.items);
    } catch (err) {
      setError(errorText(err));
    }
  };
  return (
    <div className="mb-6 max-w-xl">
      <form onSubmit={(event) => void search(event)} className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="SĐT hoặc tên"
          aria-label="Tìm người dùng"
          className="border-border flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          Tìm
        </button>
      </form>
      <div className="mt-3">
        <AdminError message={error} />
      </div>
      {items?.length === 0 ? <p className="text-sm text-stone-600">Không tìm thấy ai.</p> : null}
      {items?.map((user) => (
        <button
          key={user.id}
          type="button"
          onClick={() => onPick(user)}
          className="border-border mb-1 block w-full rounded-md border px-3 py-2 text-left text-sm hover:bg-stone-50"
        >
          <span className="font-semibold">{user.name}</span>{' '}
          <span className="text-stone-600">
            · {user.phoneNumber} · {user.trusters} người tin tưởng
          </span>
        </button>
      ))}
    </div>
  );
}
