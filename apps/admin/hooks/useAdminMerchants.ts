import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface AdminMerchantItem {
  id: string;
  businessName: string;
  category: string | null;
  addressText: string;
  isVerified: boolean;
  phoneVisibility: 'always' | 'business_hours' | 'hidden';
  recentPostCount: number;
  createdAt: string;
}

// Danh sách merchant cho admin giám sát (tai-lieu-chuc-nang.md #97) — KHÔNG có hành động duyệt/từ
// chối vì đăng ký merchant đã tự động isVerified=true từ khi bỏ yêu cầu chụp mặt tiền (mục 39).
export function useAdminMerchants() {
  const router = useRouter();
  const [merchants, setMerchants] = React.useState<AdminMerchantItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const search = React.useCallback(
    async (query?: string) => {
      setLoading(true);
      setError(null);
      try {
        const params = query?.trim() ? `?query=${encodeURIComponent(query.trim())}` : '';
        const data = await adminFetch<AdminMerchantItem[]>(`/api/admin/merchants${params}`);
        setMerchants(data);
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

  React.useEffect(() => {
    void search();
  }, [search]);

  return { merchants, error, loading, search };
}
