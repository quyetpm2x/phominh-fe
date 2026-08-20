'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useCurrentAdmin } from '@/hooks/useCurrentAdmin';
import { changeAdminPassword, clearAdminToken } from '@/lib/adminApi';

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('');
}

// Dropdown tên + avatar ở topbar, thay cho nút "Thoát" trần trước đây — gộp cả đăng xuất và đổi
// mật khẩu vào 1 chỗ, khớp mô hình "mỗi admin tự quản lý tài khoản của mình" (không có box tên
// giả cứng "Hồng Thắm" nữa, đọc tên thật qua useCurrentAdmin).
export function AdminMenu() {
  const admin = useCurrentAdmin();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [changingPassword, setChangingPassword] = React.useState(false);

  function logout() {
    clearAdminToken();
    router.push('/login');
  }

  if (!admin) return null;

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-border flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-white pl-1.5 pr-3 text-sm font-medium"
      >
        <span className="bg-admin-green flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-semibold text-white">
          {initials(admin.name)}
        </span>
        {admin.name}
        <span className="text-xs text-stone-600">▼</span>
      </button>
      {open && (
        <div className="border-border absolute right-0 top-11 z-30 w-56 overflow-hidden rounded-lg border bg-white shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setChangingPassword(true);
            }}
            className="border-stone-75 block w-full border-b px-3.5 py-2.5 text-left text-sm hover:bg-stone-50"
          >
            Đổi mật khẩu
          </button>
          <button
            type="button"
            onClick={logout}
            className="text-admin-red block w-full px-3.5 py-2.5 text-left text-sm hover:bg-stone-50"
          >
            Đăng xuất
          </button>
        </div>
      )}
      {changingPassword && <ChangePasswordModal onClose={() => setChangingPassword(false)} />}
    </div>
  );
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới nhập lại không khớp');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra, thử lại sau.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={(e) => void submit(e)}
        className="border-border w-full max-w-sm rounded-lg border bg-white p-5"
      >
        <div className="text-sm font-semibold">Đổi mật khẩu</div>

        {error && (
          <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mt-3 rounded-md border px-3 py-2 text-xs">
            {error}
          </div>
        )}

        <PasswordFields
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <ModalActions saving={saving} onClose={onClose} />
      </form>
    </div>
  );
}

function ModalActions({ saving, onClose }: { saving: boolean; onClose: () => void }) {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <button
        type="button"
        onClick={onClose}
        className="border-border rounded-md border px-3 py-1.5 text-xs font-medium"
      >
        Huỷ
      </button>
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
      >
        {saving ? 'Đang lưu…' : 'Lưu'}
      </button>
    </div>
  );
}

function PasswordFields({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}: {
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
}) {
  return (
    <div className="mt-3.5 flex flex-col gap-2.5">
      <input
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Mật khẩu hiện tại"
        type="password"
        required
        className="border-border rounded-md border px-3 py-2 text-sm"
      />
      <input
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Mật khẩu mới (tối thiểu 8 ký tự)"
        type="password"
        required
        minLength={8}
        className="border-border rounded-md border px-3 py-2 text-sm"
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Nhập lại mật khẩu mới"
        type="password"
        required
        minLength={8}
        className="border-border rounded-md border px-3 py-2 text-sm"
      />
    </div>
  );
}
