import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface LeaderboardSnapshotEntry {
  userId: string;
  alias: string;
  avatarUrl: string | null;
  rank: number;
  score: number;
  rewardAmount: number | null;
}

// Xem bảng xếp hạng thưởng đã chốt theo tháng (tai-lieu-chuc-nang.md #116) — tái dùng dữ liệu
// LeaderboardSnapshot thật, đã có sẵn từ mục 57 (mobile) + cron chốt bảng hàng tháng.
export function useAdminLeaderboard() {
  const router = useRouter();
  const [entries, setEntries] = React.useState<LeaderboardSnapshotEntry[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(
    async (tier: number, period?: string) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ tier: String(tier) });
        if (period?.trim()) params.set('period', period.trim());
        const data = await adminFetch<LeaderboardSnapshotEntry[]>(
          `/api/admin/leaderboard-snapshots?${params.toString()}`,
        );
        setEntries(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  return { entries, error, loading, load };
}
