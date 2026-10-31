import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface PenaltyAppealItem {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  explanation: string;
  createdAt: string;
  userId: string;
  userName: string;
  userPhone: string;
  penaltyDelta: number;
  penaltySeverity: 'light' | 'medium' | 'severe' | null;
  penaltyAt: string;
}

// Xử lý khiếu nại phạt oan (tai-lieu-chuc-nang.md #96) — model PenaltyAppeal trước đây orphaned
// hoàn toàn, đây là hook đầu tiên gọi tới.
export function usePenaltyAppeals() {
  const router = useRouter();
  const [items, setItems] = React.useState<PenaltyAppealItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<PenaltyAppealItem[]>(
        '/api/admin/penalty-appeals?status=pending',
      );
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

  async function review(appealId: string, decision: 'approved' | 'rejected'): Promise<void> {
    setPendingId(appealId);
    try {
      await adminFetch(`/api/admin/penalty-appeals/${appealId}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ decision }),
      });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không xử lý được');
    } finally {
      setPendingId(null);
    }
  }

  return { items, error, pendingId, review };
}
