import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface AdminUserListItem {
  id: string;
  alias: string;
  phoneNumber: string;
  accountStatus: 'active' | 'banned' | 'restricted';
  trustScoreE1: number;
  trustBadgeLabel: string;
  postCount: number;
  createdAt: string;
}

interface AdminUserListResult {
  items: AdminUserListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AdminUserTrustHistoryItem {
  id: string;
  delta: number;
  sourceType: string;
  severity: string | null;
  createdAt: string;
}

export interface AdminUserDetail extends AdminUserListItem {
  realName: string | null;
  statusReason: string | null;
  postCount: number;
  commentCount: number;
  reportsReceivedCount: number;
  reportsSentCount: number;
  trustHistory: AdminUserTrustHistoryItem[];
}

// Danh sách người dùng, tìm theo SĐT/bí danh + phân trang offset (tai-lieu-chuc-nang.md #91) —
// đủ dùng ở quy mô vài trăm user, chưa cần cursor-based cho quy mô lớn hơn nhiều.
export function useAdminUsersList() {
  const router = useRouter();
  const [result, setResult] = React.useState<AdminUserListResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const queryRef = React.useRef('');

  const fetchPage = React.useCallback(
    async (query: string, page: number) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page: String(page) });
        if (query.trim()) params.set('query', query.trim());
        const data = await adminFetch<AdminUserListResult>(`/api/admin/users?${params}`);
        setResult(data);
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

  const search = React.useCallback(
    (query: string) => {
      queryRef.current = query;
      return fetchPage(query, 1);
    },
    [fetchPage],
  );

  const goToPage = React.useCallback(
    (page: number) => fetchPage(queryRef.current, page),
    [fetchPage],
  );

  React.useEffect(() => {
    void fetchPage('', 1);
  }, [fetchPage]);

  return {
    users: result?.items ?? null,
    total: result?.total ?? 0,
    page: result?.page ?? 1,
    pageSize: result?.pageSize ?? 30,
    error,
    loading,
    search,
    goToPage,
  };
}

// Chi tiết đầy đủ — bắt buộc ghi lý do trước khi xem (tai-lieu-chuc-nang.md #92).
export function useAdminUserDetail(userId: string | null) {
  const router = useRouter();
  const [detail, setDetail] = React.useState<AdminUserDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [revealing, setRevealing] = React.useState(false);

  async function reveal(reason: string): Promise<void> {
    if (!userId) return;
    setRevealing(true);
    setError(null);
    try {
      const data = await adminFetch<AdminUserDetail>(`/api/admin/users/${userId}/reveal`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
      setDetail(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không xem được');
    } finally {
      setRevealing(false);
    }
  }

  return { detail, error, revealing, reveal };
}
