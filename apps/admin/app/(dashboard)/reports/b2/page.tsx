'use client';

import { ReportQueueView } from '@/components/report-queue-view';
import type { ReportItem } from '@/hooks/useReportQueue';
import { displayName } from '@/lib/post-detail-labels';

// Report bình luận — B2 (tai-lieu-chuc-nang.md #87).
export default function ReportsB2Page() {
  return (
    <ReportQueueView
      endpoint="/api/admin/reports/comments-public"
      severeActionLabel="Ẩn bình luận"
      extraField="hideComment"
      renderContent={(report) => ({ node: <CommentContent report={report} />, canAct: true })}
    />
  );
}

function CommentContent({ report }: { report: ReportItem }) {
  const comment = report.comment;
  if (!comment) return <div className="text-sm text-stone-600">(Không tìm thấy bình luận)</div>;

  return (
    <div>
      <div className="text-sm leading-snug">{comment.content}</div>
      <div className="mt-1 text-xs text-stone-600">
        {displayName(comment.author.realName, comment.author.nickname)} ·{' '}
        {new Date(comment.createdAt).toLocaleString('vi-VN')}
        {comment.isHidden ? ' · Đã bị ẩn trước đó' : ''}
      </div>
    </div>
  );
}
