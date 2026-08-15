'use client';

import * as React from 'react';

import { Pill } from '@/components/pill';
import {
  useAdminAccounts,
  type AdminAccountItem,
  type PermissionOption,
} from '@/hooks/useAdminAccounts';

const INPUT_CLASS = 'border-border rounded-md border px-3 py-2 text-sm';

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('');
}

function groupByName(permissions: PermissionOption[]): Record<string, PermissionOption[]> {
  const groups: Record<string, PermissionOption[]> = {};
  for (const p of permissions) {
    (groups[p.groupName] ??= []).push(p);
  }
  return groups;
}

// Thay AdminsTable mock cũ (tai-lieu-chuc-nang.md #111/#113) — dữ liệu THẬT từ bảng admin_users,
// không phải mock ADMINS[] nữa.
export function AdminAccountsPanel() {
  const { admins, permissions, error, creating, createAdmin } = useAdminAccounts();
  const [formOpen, setFormOpen] = React.useState(false);

  return (
    <div className="border-border bg-background mt-4 overflow-hidden rounded-lg border">
      <div className="flex items-start justify-between gap-3 border-b border-stone-100 px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Tài khoản admin</div>
          <div className="mt-1 text-xs text-stone-600">
            Chỉ chủ sở hữu mới cấp phát hoặc thu hồi được quyền.
          </div>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          className="flex-none rounded-md bg-stone-900 px-2.5 py-1.5 text-xs font-semibold text-white"
        >
          {formOpen ? 'Đóng' : 'Thêm admin'}
        </button>
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red border-b px-5 py-3 text-sm">
          {error}
        </div>
      ) : null}

      {formOpen && permissions ? (
        <CreateAdminForm
          permissions={permissions}
          creating={creating}
          onSubmit={async (input) => {
            if (await createAdmin(input)) setFormOpen(false);
          }}
        />
      ) : null}

      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-4">Thành viên</div>
        <div className="col-span-2">Vai trò</div>
        <div className="col-span-4">Quyền</div>
        <div className="col-span-2">Tạo lúc</div>
      </div>
      {admins === null ? (
        <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>
      ) : (
        admins.map((a) => <AdminRow key={a.id} admin={a} />)
      )}
    </div>
  );
}

function AdminRow({ admin }: { admin: AdminAccountItem }) {
  return (
    <div className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0">
      <div className="col-span-4 flex items-center gap-2.5">
        <span className="bg-muted flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold">
          {initials(admin.name)}
        </span>
        <span className="min-w-0">
          <span className="block font-medium">{admin.name}</span>
          <span className="block font-mono text-xs text-stone-600">{admin.email}</span>
        </span>
      </div>
      <div className="col-span-2">
        <Pill tone={admin.isOwner ? 'bad' : 'ok'}>{admin.isOwner ? 'Owner' : 'Admin'}</Pill>
      </div>
      <div className="col-span-4 text-xs text-stone-600">
        {admin.permissionKeys.length === 0 ? '—' : `${admin.permissionKeys.length} quyền`}
      </div>
      <div className="col-span-2 text-xs text-stone-600">
        {new Date(admin.createdAt).toLocaleDateString('vi-VN')}
      </div>
    </div>
  );
}

function CreateAdminForm({
  permissions,
  creating,
  onSubmit,
}: {
  permissions: PermissionOption[];
  creating: boolean;
  onSubmit: (input: {
    email: string;
    password: string;
    name: string;
    permissionKeys: string[];
  }) => void;
}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const groups = groupByName(permissions);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password, name, permissionKeys: [...selected] });
      }}
      className="border-b border-stone-100 px-5 py-4"
    >
      <NameEmailPasswordFields
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <PermissionGroups groups={groups} selected={selected} onToggle={toggle} />
      <button
        type="submit"
        disabled={creating}
        className="mt-3 rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
      >
        {creating ? 'Đang tạo…' : 'Tạo tài khoản'}
      </button>
    </form>
  );
}

function NameEmailPasswordFields({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}: {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Họ tên"
        required
        className={INPUT_CLASS}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        className={INPUT_CLASS}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu (tối thiểu 8 ký tự)"
        type="password"
        required
        minLength={8}
        className={INPUT_CLASS}
      />
    </div>
  );
}

function PermissionGroups({
  groups,
  selected,
  onToggle,
}: {
  groups: Record<string, PermissionOption[]>;
  selected: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {Object.entries(groups).map(([groupName, items]) => (
        <div key={groupName}>
          <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            {groupName}
          </div>
          {items.map((p) => (
            <label key={p.id} className="mt-1 flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={selected.has(p.permissionKey)}
                onChange={() => onToggle(p.permissionKey)}
              />
              {p.label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
