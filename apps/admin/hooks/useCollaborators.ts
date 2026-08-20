import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface CollaboratorStatsItem {
  id: string;
  alias: string;
  phoneNumber: string;
  createdAt: string;
  postsCount: number;
  votesCount: number;
  commentsCount: number;
  postsTarget: number;
  votesTarget: number;
  commentsTarget: number;
  peakHour: number | null;
}

// Quản lý cộng tác viên (ngoài phạm vi tài liệu chức năng gốc — bổ sung theo yêu cầu vận hành,
// thảo luận 2026-08-17). Số liệu THẬT tính trực tiếp từ Post/Vote/Comment/app_sessions theo khoảng
// ngày truyền vào — không lưu sẵn, xem CollaboratorsService. Các hành động sửa đổi (đánh dấu/gỡ/đặt
// mục tiêu) tách sang useCollaboratorActions để giữ file này gọn.
export function useCollaborators(dateFrom: string, dateTo: string) {
  const router = useRouter();
  const [items, setItems] = React.useState<CollaboratorStatsItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams({ dateFrom, dateTo });
      const data = await adminFetch<CollaboratorStatsItem[]>(
        `/api/admin/collaborators?${params.toString()}`,
      );
      setItems(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [dateFrom, dateTo, router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  return { items, error, setError, reload: load };
}
