import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface MerchantRiskItem {
  id: string;
  businessName: string;
  lastPostAt: string | null;
  daysSinceLastPost: number | null;
  postsPerWeek: number;
  status: 'ok' | 'watch' | 'at_risk';
}

// Báo cáo Merchant G6 (tai-lieu-chuc-nang.md #108) — dữ liệu THẬT tính trực tiếp từ bảng posts,
// cửa sổ 4 tuần gần nhất cho tần suất đăng.
export function useMerchantRisk() {
  const router = useRouter();
  const [items, setItems] = React.useState<MerchantRiskItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<MerchantRiskItem[]>('/api/admin/analytics/merchant-risk');
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
