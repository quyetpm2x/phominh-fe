'use client';

import * as React from 'react';

import { CreateAdminForm } from '@/components/create-admin-form';
import { EditAdminPermissions } from '@/components/edit-admin-permissions';
import { Pill } from '@/components/pill';
import {
  useAdminAccounts,
  type AdminAccountItem,
  type PermissionOption,
} from '@/hooks/useAdminAccounts';

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('');
}

// Thay AdminsTable mock cũ (tai-lieu-chuc-nang.md #111/#113) — dữ liệu THẬT từ bảng admin_users,
// không phải mock ADMINS[] nữa.
export function AdminAccountsPanel() {
  const { admins, permissions, error, creating, savingId, createAdmin, updatePermissions } =
    useAdminAccounts();
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

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

      <AdminAccountsTable
        admins={admins}
        permissions={permissions}
        editingId={editingId}
        savingId={savingId}
        onToggleEdit={(id) => setEditingId(editingId === id ? null : id)}
        onSave={async (id, keys) => {
          if (await updatePermissions(id, keys)) setEditingId(null);
        }}
      />
    </div>
  );
}

function AdminAccountsTable({
  admins,
  permissions,
  editingId,
  savingId,
  onToggleEdit,
  onSave,
}: {
  admins: AdminAccountItem[] | null;
  permissions: PermissionOption[] | null;
  editingId: string | null;
  savingId: string | null;
  onToggleEdit: (id: string) => void;
  onSave: (id: string, permissionKeys: string[]) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-4">Thành viên</div>
        <div className="col-span-2">Vai trò</div>
        <div className="col-span-4">Quyền</div>
        <div className="col-span-1">Tạo lúc</div>
        <div className="col-span-1" />
      </div>
      {admins === null ? (
        <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>
      ) : (
        admins.map((a) => (
          <AdminRow
            key={a.id}
            admin={a}
            permissions={permissions}
            editing={editingId === a.id}
            saving={savingId === a.id}
            onToggleEdit={() => onToggleEdit(a.id)}
            onSave={(keys) => onSave(a.id, keys)}
          />
        ))
      )}
    </>
  );
}

function AdminRow({
  admin,
  permissions,
  editing,
  saving,
  onToggleEdit,
  onSave,
}: {
  admin: AdminAccountItem;
  permissions: PermissionOption[] | null;
  editing: boolean;
  saving: boolean;
  onToggleEdit: () => void;
  onSave: (permissionKeys: string[]) => void;
}) {
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
      <div className="col-span-1 text-xs text-stone-600">
        {new Date(admin.createdAt).toLocaleDateString('vi-VN')}
      </div>
      <div className="col-span-1 text-right">
        {admin.isOwner ? null : (
          <button
            type="button"
            onClick={onToggleEdit}
            className="rounded-md border border-stone-300 px-2 py-1 text-xs font-medium"
          >
            {editing ? 'Đóng' : 'Sửa quyền'}
          </button>
        )}
      </div>
      {editing && permissions ? (
        <EditAdminPermissions
          permissions={permissions}
          currentKeys={admin.permissionKeys}
          saving={saving}
          onSave={onSave}
          onCancel={onToggleEdit}
        />
      ) : null}
    </div>
  );
}
