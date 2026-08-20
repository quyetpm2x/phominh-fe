import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface HourBucket {
  hour: number;
  count: number;
}

export interface UserActivityOverview {
  activeUserCount: number;
  totalSessions: number;
  avgSessionMinutes: number;
  hourHistogram: HourBucket[];
}

// Thống kê hoạt động người dùng — G9 (bổ sung ngoài 117 mục gốc, thảo luận 2026-08-17). Thời lượng
// dùng THẬT tính từ app_sessions.closed_at (mới thêm cùng phiên) — không phải ước lượng.
export function useUserActivityOverview(dateFrom: string, dateTo: string) {
  const router = useRouter();
  const [overview, setOverview] = React.useState<UserActivityOverview | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const params = new URLSearchParams({ dateFrom, dateTo });
        const data = await adminFetch<UserActivityOverview>(
          `/api/admin/user-activity/overview?${params.toString()}`,
        );
        setOverview(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [dateFrom, dateTo, router]);

  return { overview, error };
}
