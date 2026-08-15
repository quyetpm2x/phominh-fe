'use client';

import { ReportQueueView } from '@/components/report-queue-view';
import { ScreenAccessGuard } from '@/components/screen-banner';
import type { ReportItem } from '@/hooks/useReportQueue';

// Report bình luận công khai — B2 (tai-lieu-chuc-nang.md #87).
export default function ReportsB2Page() {
  return (
    <ScreenAccessGuard screen="B2">
      <ReportQueueView
        endpoint="/api/admin/reports/comments-public"
        severeActionLabel="Ẩn bình luận"
        extraField="hideComment"
        renderContent={(report) => ({ node: <CommentContent report={report} />, canAct: true })}
      />
    </ScreenAccessGuard>
  );
}

function CommentContent({ report }: { report: ReportItem }) {
  const comment = report.comment;
  if (!comment) return <div className="text-sm text-stone-600">(Không tìm thấy bình luận)</div>;

  return (
    <div>
      <div className="text-sm leading-snug">{comment.content}</div>
      <div className="mt-1 text-xs text-stone-600">
        {comment.author.alias} · {new Date(comment.createdAt).toLocaleString('vi-VN')}
        {comment.isHidden ? ' · Đã bị ẩn trước đó' : ''}
      </div>
    </div>
  );
}
