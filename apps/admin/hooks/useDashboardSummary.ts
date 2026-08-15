import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface DashboardSummary {
  newUsersToday: number;
  newPostsToday: number;
  pendingReports: number;
  activeMerchants: number;
}

// 4 số liệu cốt lõi (tai-lieu-chuc-nang.md #85) — dữ liệu THẬT, đếm trực tiếp lúc gọi (không qua
// snapshot cron chưa xây).
export function useDashboardSummary() {
  const router = useRouter();
  const [summary, setSummary] = React.useState<DashboardSummary | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<DashboardSummary>('/api/admin/analytics/dashboard-summary');
        setSummary(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [router]);

  return { summary, error };
}
