import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface PendingDeletionItem {
  id: string;
  userId: string;
  alias: string;
  phoneNumber: string;
  requestedAt: string;
  daysRemaining: number;
}

// Hàng đợi yêu cầu xoá dữ liệu đang chờ (tai-lieu-chuc-nang.md #104) — luồng tự động (cron hard-delete
// sau 30 ngày) đã có sẵn, đây là bổ sung cho admin chủ động xem/đẩy nhanh khi cần gấp.
export function useDataDeletions() {
  const router = useRouter();
  const [items, setItems] = React.useState<PendingDeletionItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<PendingDeletionItem[]>('/api/admin/data-deletion-requests');
      setItems(data);
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

  async function expedite(userId: string): Promise<void> {
    setPendingId(userId);
    try {
      await adminFetch(`/api/admin/data-deletion-requests/${userId}/expedite`, { method: 'POST' });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không xử lý được');
    } finally {
      setPendingId(null);
    }
  }

  return { items, error, pendingId, expedite };
}
