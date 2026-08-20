import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface DailySnapshotMetrics {
  g2: {
    newPostsCount: number;
    postTypeRatio: { life: number; merchant: number; emergency: number };
    avgPostAgeHoursWhenViewed: number | null;
  };
  g3: {
    newAccountsCount: number;
    onboardingCompletionRate: number | null;
  };
  g4: {
    retentionD1: number | null;
    retentionD7: number | null;
    retentionD30: number | null;
  };
}

export interface LatestSnapshotItem {
  areaId: string | null;
  areaName: string;
  snapshotDate: string;
  metrics: DailySnapshotMetrics;
}

// Sức khỏe theo khu vực G2-G4 (tai-lieu-chuc-nang.md #107) — 1 dòng/khu (+ "Toàn hệ thống"), bản
// mới nhất DailyMetricsSnapshotCronService đã tính (chạy hàng ngày 3h sáng).
export function useLatestSnapshots() {
  const router = useRouter();
  const [items, setItems] = React.useState<LatestSnapshotItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<LatestSnapshotItem[]>(
          '/api/admin/analytics/latest-snapshots',
        );
        setItems(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [router]);

  return { items, error };
}
