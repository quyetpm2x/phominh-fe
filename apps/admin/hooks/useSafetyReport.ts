import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface SafetyReport {
  windowDays: number;
  totalPosts: number;
  totalReports: number;
  reportRatePercent: number;
  avgReviewTimeHours: number | null;
  commentAttackIncidentCount: number;
  voteCollusionFlagCount: number;
  avgEmergencyVerificationHours: number | null;
}

// Báo cáo An toàn G7 (tai-lieu-chuc-nang.md #109).
export function useSafetyReport() {
  const router = useRouter();
  const [report, setReport] = React.useState<SafetyReport | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<SafetyReport>('/api/admin/analytics/safety-report');
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
