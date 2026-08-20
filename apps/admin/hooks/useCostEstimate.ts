import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface CostEstimateReport {
  windowDays: number;
  smsCostVnd: number;
  smsCount: number;
  storageCostVndPerMonth: number;
  imageCount: number;
  visionApiCostVnd: number;
  totalCostVnd: number;
  activeUsers: number;
  costPerActiveUserVnd: number | null;
  isEstimate: true;
}

// Chi phí vận hành G8 (tai-lieu-chuc-nang.md #110) — backend tự chặn 403 nếu không phải Owner
// (OwnerOnlyGuard), lỗi đó hiện thẳng qua `error` bên dưới, không cần tự kiểm tra isOwner ở FE.
export function useCostEstimate() {
  const router = useRouter();
  const [report, setReport] = React.useState<CostEstimateReport | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<CostEstimateReport>('/api/admin/analytics/cost-estimate');
        setReport(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [router]);

  return { report, error };
}
