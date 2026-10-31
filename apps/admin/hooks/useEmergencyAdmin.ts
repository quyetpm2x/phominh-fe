import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface EmergencyPost {
  id: string;
  content: string;
  authorName: string;
  authorNickname: string | null;
  createdAt: string;
  confirmCount: number;
  threshold: number;
  verifiedAt: string | null;
  resolvedAt: string | null;
}

// B5 (tai-lieu-chuc-nang.md #90) — can thiệp thủ công + đánh dấu đã giải quyết.
export function useEmergencyAdmin() {
  const router = useRouter();
  const [posts, setPosts] = React.useState<EmergencyPost[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<EmergencyPost[]>('/api/admin/emergency');
      setPosts(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function runAction(postId: string, action: 'verify' | 'resolve') {
    setPendingId(postId);
    try {
      await adminFetch(`/api/admin/emergency/${postId}/${action}`, { method: 'PATCH' });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không cập nhật được');
    } finally {
      setPendingId(null);
    }
  }

  return { posts, error, pendingId, runAction };
}
