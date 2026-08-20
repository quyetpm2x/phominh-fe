'use client';

import * as React from 'react';

import { groupByName, PermissionGroups } from '@/components/permission-groups';
import type { PermissionOption } from '@/hooks/useAdminAccounts';

const INPUT_CLASS = 'border-border rounded-md border px-3 py-2 text-sm';

// Form tạo tài khoản admin mới (tai-lieu-chuc-nang.md #111) — tách khỏi admin-accounts-panel.tsx
// (đã gần giới hạn 250 dòng khi thêm sửa/thu hồi quyền #112).
export function CreateAdminForm({
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
