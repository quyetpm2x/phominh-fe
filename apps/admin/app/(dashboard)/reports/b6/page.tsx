'use client';

import { ReportQueueView } from '@/components/report-queue-view';
import { RevealForm } from '@/components/reveal-form';
import type { ReportItem } from '@/hooks/useReportQueue';
import { useRevealMessage } from '@/hooks/useRevealMessage';
import { displayName } from '@/lib/post-detail-labels';

// Tin nhắn bị người nhận báo cáo. Tin nhắn là nội dung riêng tư nên phải ghi lý do mới xem được, mỗi lần xem đều lưu log (F3).
export default function ReportsB6Page() {
  const { revealed, error, pendingId, reveal } = useRevealMessage();
  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}
      <ReportQueueView
        endpoint="/api/admin/reports/messages"
        severeActionLabel="Thu hồi tin nhắn"
        extraField="removeMessage"
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
          return { node: <RevealedMessage report={report} content={content} />, canAct: true };
        }}
      />
    </>
  );
}

function RevealedMessage({ report, content }: { report: ReportItem; content: string }) {
  const message = report.message;
  return (
    <div>
      <div className="text-sm leading-snug">{content || '(Tin nhắn không có chữ)'}</div>
      <div className="mt-1 text-xs text-stone-600">
        {message ? displayName(message.sender.realName, message.sender.nickname) : ''} ·{' '}
        {message ? new Date(message.createdAt).toLocaleString('vi-VN') : ''}
        {message?.deletedAt ? ' · Đã thu hồi' : ''}
      </div>
    </div>
  );
}
