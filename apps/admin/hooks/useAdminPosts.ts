import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface AdminPostListItem {
  id: string;
  content: string;
  postType: 'life';
  status: 'active' | 'removed' | 'expired';
  authorId: string;
  authorName: string;
  // Admin thấy cả biệt danh để đối chiếu bài ẩn danh với người đăng khi kiểm duyệt.
  authorNickname: string | null;
  imageCount: number;
  voteCount: number;
  commentCount: number;
  isSeeded: boolean;
  createdAt: string;
}

interface AdminPostListResult {
  items: AdminPostListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AdminCommentNode {
  id: string;
  authorNickname: string | null;
  authorRealName: string | null;
  content: string;
  isHidden: boolean;
  parentCommentId: string | null;
  createdAt: string;
  replies: AdminCommentNode[];
}

export interface AdminPostDetail extends AdminPostListItem {
  authorRealName: string | null;
  images: { id: string; url: string }[];
  comments: AdminCommentNode[];
}

// Danh sách toàn bộ bài đăng cho admin — ngoài phạm vi 117 mục gốc (tai-lieu-chuc-nang.md mục
// 120). Phân trang offset, cùng pattern useAdminUsersList (mục 91).
export function useAdminPostsList() {
  const router = useRouter();
  const [result, setResult] = React.useState<AdminPostListResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchPage = React.useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await adminFetch<AdminPostListResult>(`/api/admin/posts?page=${page}`);
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

  React.useEffect(() => {
    void fetchPage(1);
  }, [fetchPage]);

  return {
    posts: result?.items ?? null,
    total: result?.total ?? 0,
    page: result?.page ?? 1,
    pageSize: result?.pageSize ?? 30,
    error,
    loading,
    goToPage: fetchPage,
  };
}

// Chi tiết 1 bài đăng (ảnh + bình luận thật) + thao tác ẩn — mở từ modal khi click 1 dòng trong
// danh sách.
export function useAdminPostDetail(postId: string | null) {
  const router = useRouter();
  const [detail, setDetail] = React.useState<AdminPostDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const load = React.useCallback(async () => {
    if (!postId) return;
    setError(null);
    try {
      const data = await adminFetch<AdminPostDetail>(`/api/admin/posts/${postId}`);
      setDetail(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [postId, router]);

  React.useEffect(() => {
    if (!postId) {
      setDetail(null);
      return;
    }
    setDetail(null);
    setLoading(true);
    void load().finally(() => setLoading(false));
  }, [postId, load]);

  const actions = useHideActions(postId, setDetail, setError, load);

  return { detail, error, loading, ...actions };
}

// Tách khỏi useAdminPostDetail để giữ hàm đó gọn — ẩn bài + ẩn bình luận (backend tự cascade ẩn
// theo reply, xem CommentsService.cascadeHideReplies) đều tải lại chi tiết thay vì tự mô phỏng ở
// client, tránh lệch trạng thái nếu logic backend đổi sau này.
function useHideActions(
  postId: string | null,
  setDetail: React.Dispatch<React.SetStateAction<AdminPostDetail | null>>,
  setError: (msg: string | null) => void,
  load: () => Promise<void>,
) {
  const [hiding, setHiding] = React.useState(false);
  const [hidingCommentId, setHidingCommentId] = React.useState<string | null>(null);

  async function hide(reason: string): Promise<boolean> {
    if (!postId) return false;
    setHiding(true);
    setError(null);
    try {
      const updated = await adminFetch<{ id: string; status: AdminPostListItem['status'] }>(
        `/api/admin/posts/${postId}/hide`,
        { method: 'PATCH', body: JSON.stringify({ reason }) },
      );
      setDetail((prev) => (prev ? { ...prev, status: updated.status } : prev));
      return true;
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không ẩn được bài đăng');
      return false;
    } finally {
      setHiding(false);
    }
  }

  async function hideComment(commentId: string, reason: string): Promise<boolean> {
    setHidingCommentId(commentId);
    setError(null);
    try {
      await adminFetch(`/api/admin/comments/${commentId}/hide`, {
        method: 'PATCH',
        body: JSON.stringify({ reason }),
      });
      await load();
      return true;
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không ẩn được bình luận');
      return false;
    } finally {
      setHidingCommentId(null);
    }
  }

  return { hiding, hide, hidingCommentId, hideComment };
}
