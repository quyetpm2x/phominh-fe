'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Pill } from '@/components/pill';
import { useAdminUsersList, type AdminUserListItem } from '@/hooks/useAdminUsers';
import type { Tone } from '@/lib/types';

const STATUS_LABEL: Record<AdminUserListItem['accountStatus'], string> = {
  active: 'Hoạt động',
  restricted: 'Hạn chế',
  banned: 'Đã khoá',
};

const STATUS_TONE: Record<AdminUserListItem['accountStatus'], Tone> = {
  active: 'ok',
  restricted: 'warn',
  banned: 'bad',
};

function initials(alias: string): string {
  return alias.slice(0, 2).toUpperCase();
}

// Danh sách người dùng, tìm theo SĐT/bí danh (tai-lieu-chuc-nang.md #91) — dữ liệu THẬT từ bảng
// users, thay hẳn mock USERS[] cũ. Chi tiết từng dòng dẫn sang C2 (mục 92).
export default function UsersC1Page() {
  const { users, total, page, pageSize, error, loading, search, goToPage } = useAdminUsersList();
  const [query, setQuery] = useState('');
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void search(query);
        }}
        className="mb-4 flex gap-2"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo SĐT hoặc bí danh"
          className="border-border flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Đang tìm…' : 'Tìm'}
        </button>
      </form>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-4">Người dùng</div>
          <div className="col-span-2">SĐT</div>
          <div className="col-span-1">Bài đăng</div>
          <div className="col-span-2">Điểm E1</div>
          <div className="col-span-2">Tham gia</div>
          <div className="col-span-1">Trạng thái</div>
        </div>
        <UsersListBody users={users} />
      </div>

      {total > 0 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          total={total}
          loading={loading}
          onChange={(p) => void goToPage(p)}
        />
      )}
    </>
  );
}

function UsersListBody({ users }: { users: AdminUserListItem[] | null }) {
  if (users === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (users.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">
        Không tìm thấy người dùng nào.
      </div>
    );
  }
  return (
    <>
      {users.map((u) => (
        <Link
          key={u.id}
          href={`/users/c2?id=${u.id}`}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-4 flex items-center gap-2.5">
            <span className="bg-muted flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold">
              {initials(u.alias)}
            </span>
            <span className="min-w-0">
              <span className="block font-medium">{u.alias}</span>
              <span className="block text-xs text-stone-600">{u.trustBadgeLabel}</span>
            </span>
          </div>
          <div className="col-span-2 font-mono text-xs text-stone-700">{u.phoneNumber}</div>
          <div className="col-span-1 text-stone-700">{u.postCount}</div>
          <div className="col-span-2 font-semibold">{u.trustScoreE1}</div>
          <div className="col-span-2 text-stone-700">
            {new Date(u.createdAt).toLocaleDateString('vi-VN')}
          </div>
          <div className="col-span-1">
            <Pill tone={STATUS_TONE[u.accountStatus]}>{STATUS_LABEL[u.accountStatus]}</Pill>
          </div>
        </Link>
      ))}
    </>
  );
}

function PaginationControls({
  page,
  totalPages,
  total,
  loading,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  loading: boolean;
  onChange: (page: number) => void;
}) {
  return (
    <div className="mt-3.5 flex items-center justify-between text-sm text-stone-600">
      <span>
        Trang {page}/{totalPages} — {total.toLocaleString('vi-VN')} người dùng
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={loading || page <= 1}
          onClick={() => onChange(page - 1)}
          className="border-border rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-40"
        >
          Trước
        </button>
        <button
          type="button"
          disabled={loading || page >= totalPages}
          onClick={() => onChange(page + 1)}
          className="border-border rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-40"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
