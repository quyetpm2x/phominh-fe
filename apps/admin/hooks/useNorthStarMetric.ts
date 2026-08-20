import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface NorthStarMetric {
  percentage: number;
  sessionsWithNewPost: number;
  totalSessions: number;
}

// Chỉ số Bắc Đẩu G1 (tai-lieu-chuc-nang.md #106) — dữ liệu THẬT tính trực tiếp từ app_sessions +
// post_views (bussiness §9.7), cửa sổ mặc định 7 ngày gần nhất.
export function useNorthStarMetric() {
  const router = useRouter();
  const [metric, setMetric] = React.useState<NorthStarMetric | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<NorthStarMetric>('/api/admin/analytics/north-star');
        setMetric(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [router]);

  return { metric, error };
}
