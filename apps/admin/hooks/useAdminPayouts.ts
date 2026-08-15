import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export type PayoutStatus = 'pending' | 'processing' | 'success' | 'failed';

export interface AdminPayoutItem {
  id: string;
  userId: string;
  userAlias: string;
  userPhoneNumber: string;
  amount: number;
  source: 'leaderboard' | 'referral';
  status: PayoutStatus;
  bankCode: string;
  accountHolderName: string;
  providerTransactionId: string | null;
  createdAt: string;
  requiresManualApproval: boolean;
}

// Hàng đợi duyệt chi hộ (tai-lieu-chuc-nang.md #115) — trước đây không có UI nào, chỉ có route
// PATCH .../process gọi tay qua id đã biết trước.
export function useAdminPayouts() {
  const router = useRouter();
  const [payouts, setPayouts] = React.useState<AdminPayoutItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<PayoutStatus | undefined>('pending');
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const data = await adminFetch<AdminPayoutItem[]>(`/api/admin/payouts${params}`);
      setPayouts(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [statusFilter, router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function processPayout(payoutId: string) {
    setPendingId(payoutId);
    try {
      await adminFetch(`/api/admin/payouts/${payoutId}/process`, { method: 'PATCH' });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không xử lý được');
    } finally {
      setPendingId(null);
    }
  }

  return { payouts, error, statusFilter, setStatusFilter, pendingId, processPayout };
}
