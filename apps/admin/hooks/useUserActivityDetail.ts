import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface UserActivityDetail {
  sessionCount: number;
  totalMinutes: number;
  avgSessionMinutes: number;
  peakHour: number | null;
}

// Hoạt động 30 ngày gần nhất của 1 user cụ thể (bổ sung ngoài 117 mục gốc) — dùng trong C2, tách
// khỏi useAdminUsers để giữ file đó gọn.
export function useUserActivityDetail(userId: string | null) {
  const [detail, setDetail] = React.useState<UserActivityDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!userId) return;
    void (async () => {
      try {
        const dateTo = new Date();
        const dateFrom = new Date(dateTo);
        dateFrom.setUTCDate(dateFrom.getUTCDate() - 30);
        const params = new URLSearchParams({
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
        });
        const data = await adminFetch<UserActivityDetail>(
          `/api/admin/user-activity/${userId}?${params.toString()}`,
        );
        setDetail(data);
      } catch (err) {
        setError(err instanceof AdminApiError ? err.message : 'Không tải được hoạt động');
      }
    })();
  }, [userId]);

  return { detail, error };
}
