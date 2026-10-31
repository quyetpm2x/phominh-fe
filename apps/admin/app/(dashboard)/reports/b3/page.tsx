'use client';

import * as React from 'react';

import { ReportQueueView } from '@/components/report-queue-view';
import type { ReportItem } from '@/hooks/useReportQueue';
import { useRevealPrivateComment } from '@/hooks/useRevealPrivateComment';
import { displayName } from '@/lib/post-detail-labels';

// Bình luận riêng tư bị report — B3 (tai-lieu-chuc-nang.md #88, bussiness §9.9). Nội dung KHÔNG
// hiện cho tới khi admin ghi lý do — mỗi lượt mở được ghi vào sensitive_data_access_logs.
export default function ReportsB3Page() {
  const { revealed, error, pendingId, reveal } = useRevealPrivateComment();

  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}
      <ReportQueueView
        endpoint="/api/admin/reports/comments-private"
        severeActionLabel="Ẩn bình luận"
        extraField="hideComment"
        renderContent={(report) => {
          const content = revealed[report.id];
          if (content === undefined) {
            return {
              node: (
                <RevealForm
                  pending={pendingId === report.id}
                  onReveal={(reason) => void reveal(report.id, reason)}
                />
              ),
              canAct: false,
            };
          }
          return { node: <RevealedComment report={report} content={content} />, canAct: true };
        }}
      />
    </>
  );
}

function RevealForm({
  pending,
  onReveal,
}: {
  pending: boolean;
  onReveal: (reason: string) => void;
}) {
  const [reason, setReason] = React.useState('');
  const canSubmit = reason.trim().length >= 5;

  return (
    <div className="border-admin-amber-soft-border bg-admin-amber-soft rounded-md border p-3">
      <div className="text-admin-amber-text text-xs leading-relaxed">
        Nội dung riêng tư — bắt buộc ghi lý do trước khi xem. Mọi lượt mở đều được ghi log.
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Lý do cần xem (tối thiểu 5 ký tự)"
          className="border-border h-9 flex-1 rounded-md border bg-white px-3 text-xs"
        />
        <button
          type="button"
          disabled={!canSubmit || pending}
          onClick={() => onReveal(reason.trim())}
          className="h-9 rounded-md bg-stone-900 px-3 text-xs font-semibold text-white disabled:opacity-50"
        >
          Mở nội dung
        </button>
      </div>
    </div>
  );
}

function RevealedComment({ report, content }: { report: ReportItem; content: string }) {
  const comment = report.comment;
  return (
    <div>
      <div className="text-sm leading-snug">{content}</div>
      <div className="mt-1 text-xs text-stone-600">
        {comment ? displayName(comment.author.realName, comment.author.nickname) : ''} ·{' '}
        {comment ? new Date(comment.createdAt).toLocaleString('vi-VN') : ''}
      </div>
    </div>
  );
}
