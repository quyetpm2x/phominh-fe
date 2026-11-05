import { useRouter } from 'next/navigation';
import * as React from 'react';

import type { AccountStatus } from '@/lib/accountLockActions';
import { AdminApiError, adminFetch } from '@/lib/adminApi';

export type { AccountStatus };

export interface AdminUserLookupResult {
  id: string;
  nickname: string | null;
  phoneNumber: string;
  realName: string | null;
  accountStatus: AccountStatus;
  statusReason: string | null;
  restrictedUntil: string | null;
  trusters: number;
  createdAt: string;
}

// Tra cứu + khoá/mở khoá tài khoản (tai-lieu-chuc-nang.md #95) — trước đây PATCH admin/users/:id/status
// đã chạy thật nhưng không có UI/cách nào tìm ra userId cần khoá.
export function useAccountLock() {
  const router = useRouter();
  const [result, setResult] = React.useState<AdminUserLookupResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [applying, setApplying] = React.useState(false);

  async function lookup(query: string): Promise<void> {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await adminFetch<AdminUserLookupResult>(
        `/api/admin/users/lookup?query=${encodeURIComponent(query.trim())}`,
      );
      setResult(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setResult(null);
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    } finally {
      setLoading(false);
    }
  }

  async function applyStatus(
    status: AccountStatus,
    reason: string,
    restrictedUntil?: string,
  ): Promise<void> {
    if (!result) return;
    setApplying(true);
    setError(null);
    try {
      await adminFetch(`/api/admin/users/${result.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, reason: reason || undefined, restrictedUntil }),
      });
      await lookup(result.id);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không cập nhật được');
    } finally {
      setApplying(false);
    }
  }

  return { result, error, loading, applying, lookup, applyStatus };
}
