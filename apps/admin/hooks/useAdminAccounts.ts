import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface AdminAccountItem {
  id: string;
  email: string;
  name: string;
  isOwner: boolean;
  createdAt: string;
  permissionKeys: string[];
}

export interface PermissionOption {
  id: string;
  permissionKey: string;
  label: string;
  groupName: string;
}

export interface CreateAdminInput {
  email: string;
  password: string;
  name: string;
  permissionKeys: string[];
}

// Tạo + xem danh sách tài khoản admin (tai-lieu-chuc-nang.md #111/#113) — trước đây nút "Thêm
// admin" không có onClick nào và không có route liệt kê admin hiện có.
export function useAdminAccounts() {
  const router = useRouter();
  const [admins, setAdmins] = React.useState<AdminAccountItem[] | null>(null);
  const [permissions, setPermissions] = React.useState<PermissionOption[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [creating, setCreating] = React.useState(false);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const [adminList, permissionList] = await Promise.all([
        adminFetch<AdminAccountItem[]>('/api/admin/admins'),
        adminFetch<PermissionOption[]>('/api/admin/permissions'),
      ]);
      setAdmins(adminList);
      setPermissions(permissionList);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function createAdmin(input: CreateAdminInput): Promise<boolean> {
    setCreating(true);
    setError(null);
    try {
      await adminFetch('/api/admin/admins', { method: 'POST', body: JSON.stringify(input) });
      await load();
      return true;
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không tạo được admin');
      return false;
    } finally {
      setCreating(false);
    }
  }

  return { admins, permissions, error, creating, createAdmin };
}
