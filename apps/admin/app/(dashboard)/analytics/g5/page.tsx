'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { StatCard } from '../_components/stat-card';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';

interface Engagement {
  posts: number;
  postsWithCommentsPercent: number;
  anonymousPostPercent: number;
  likesPerPost: number | null;
  commentsPerPost: number | null;
  comments: number;
  anonymousCommentPercent: number;
  mentions: number;
}

const num = (value: number | null) => (value === null ? '—' : value.toLocaleString('vi-VN'));

// G5 — Tương tác nội dung, tính trên các bài đăng trong khoảng và khu đã chọn.
export default function AnalyticsG5Page() {
  const { query } = useAnalyticsFilters();
  const { data, error } = useAdminResource<Engagement>(`/api/admin/analytics/engagement?${query}`);
  return (
    <>
      <AnalyticsChrome current="G5" range area />
      <div className="mt-3.5">
        <AdminError message={error} />
        {!data && !error ? <div className="text-sm text-stone-600">Đang tải…</div> : null}
        {data ? (
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
            <StatCard label="Bài đăng" value={num(data.posts)} />
            <StatCard label="Bài có bình luận" value={`${data.postsWithCommentsPercent}%`} />
            <StatCard label="Bài ẩn danh" value={`${data.anonymousPostPercent}%`} />
            <StatCard label="Tym trung bình mỗi bài" value={num(data.likesPerPost)} />
            <StatCard label="Bình luận trung bình mỗi bài" value={num(data.commentsPerPost)} />
            <StatCard label="Bình luận" value={num(data.comments)} />
            <StatCard label="Bình luận ẩn danh" value={`${data.anonymousCommentPercent}%`} />
            <StatCard label="Lượt tag" value={num(data.mentions)} />
          </div>
        ) : null}
      </div>
    </>
  );
}
