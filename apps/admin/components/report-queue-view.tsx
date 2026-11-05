'use client';

import { cn } from '@pho-minh/ui';
import type { ReactNode } from 'react';

import { Pill } from './pill';
import { ReportActionBar } from './report-action-bar';

import { useReportQueue, type ReportItem, type ReportStatus } from '@/hooks/useReportQueue';
import { STATUS_LABEL, STATUS_TONE } from '@/lib/reportLabels';

const STATUS_TABS: { value: ReportStatus | undefined; label: string }[] = [
  { value: 'pending', label: 'Chờ xử lý' },
  { value: 'reviewed', label: 'Đang xem xét' },
  { value: 'actioned', label: 'Đã xử lý' },
  { value: 'dismissed', label: 'Đã bác' },
  { value: undefined, label: 'Tất cả' },
];

// Khung dùng chung cho các hàng đợi report (B1/B2/B6) — phần nội dung
// (ảnh bài đăng vs nội dung bình luận) do renderContent quyết định, phần hành động (duyệt/cảnh
// cáo/gỡ-ẩn) giống hệt nhau.
export function ReportQueueView({
  endpoint,
  severeActionLabel,
  extraField,
  renderContent,
}: {
  endpoint: string;
  severeActionLabel?: string;
  extraField?: 'removePost' | 'hideComment' | 'removeMessage';
  renderContent: (report: ReportItem) => { node: ReactNode; canAct: boolean };
}) {
  const { reports, error, statusFilter, setStatusFilter, pendingId, updateStatus } =
    useReportQueue(endpoint);

  return (
    <div>
      <StatusTabs value={statusFilter} onChange={setStatusFilter} />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      {reports === null ? (
        <div className="text-sm text-stone-600">Đang tải…</div>
      ) : reports.length === 0 ? (
        <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
          Không có report nào khớp bộ lọc.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              renderContent={renderContent}
              severeActionLabel={severeActionLabel}
              extraField={extraField}
              pending={pendingId === report.id}
              onUpdateStatus={(input) => void updateStatus(report.id, input)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StatusTabs({
  value,
  onChange,
}: {
  value: ReportStatus | undefined;
  onChange: (v: ReportStatus | undefined) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {STATUS_TABS.map((tab) => (
        <button
          key={String(tab.value)}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs',
            tab.value === value
              ? 'bg-stone-900 font-semibold text-white'
              : 'border border-stone-200 text-stone-700',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ReportRow({
  report,
  renderContent,
  severeActionLabel,
  extraField,
  pending,
  onUpdateStatus,
}: {
  report: ReportItem;
  renderContent: (report: ReportItem) => { node: ReactNode; canAct: boolean };
  severeActionLabel?: string;
  extraField?: 'removePost' | 'hideComment' | 'removeMessage';
  pending: boolean;
  onUpdateStatus: (input: {
    status: ReportStatus;
    removePost?: boolean;
    hideComment?: boolean;
    removeMessage?: boolean;
  }) => void;
}) {
  const { node, canAct } = renderContent(report);

  return (
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs text-stone-600">
          Lý do: <span className="font-medium text-stone-800">{report.reason}</span>
          {report.description ? ` — ${report.description}` : ''}
        </div>
        <Pill tone={STATUS_TONE[report.status]}>{STATUS_LABEL[report.status]}</Pill>
      </div>
      <div className="mt-2.5">{node}</div>
      {canAct ? (
        <ReportActionBar
          severeLabel={severeActionLabel}
          pending={pending}
          onDismiss={() => onUpdateStatus({ status: 'dismissed' })}
          onWarn={() => onUpdateStatus({ status: 'actioned' })}
          onSevere={
            extraField
              ? () => onUpdateStatus({ status: 'actioned', [extraField]: true })
              : undefined
          }
        />
      ) : null}
    </div>
  );
}
