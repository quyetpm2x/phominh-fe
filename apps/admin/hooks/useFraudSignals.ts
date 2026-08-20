import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface FraudSignal {
  type: 'account_creation_burst' | 'duplicate_bank_account';
  summary: string;
  detail: string;
  relatedUserIds: string[];
  detectedAt: string;
}

// Tín hiệu gian lận tổng hợp (tai-lieu-chuc-nang.md #94) — cờ tham khảo, không tự động khoá ai.
export function useFraudSignals() {
  const router = useRouter();
  const [signals, setSignals] = React.useState<FraudSignal[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<FraudSignal[]>('/api/admin/moderation/fraud-signals');
        setSignals(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [router]);

  return { signals, error };
}
