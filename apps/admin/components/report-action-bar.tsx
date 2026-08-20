import { cn } from '@pho-minh/ui';
import * as React from 'react';

import type { Severity } from '@/hooks/useReportQueue';

const SEVERITY_OPTIONS: { value: Severity; label: string }[] = [
  { value: 'light', label: 'Nhẹ' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'severe', label: 'Nghiêm trọng' },
];

// 3 hành động dùng chung cho B1/B2/B3 (tai-lieu-chuc-nang.md #86-88) — "Giữ" bác report không đổi
// điểm; "Cảnh cáo"/"severeLabel" đều actioned (ghi E2 theo severity chọn), khác nhau ở việc có
// gỡ bài/ẩn bình luận luôn hay không. `severeLabel`/`onSevere` optional — D2 (mục 98, report
// merchant_suspicious) không có hành động "gỡ" tương ứng nào ở backend, chỉ 2 nút Giữ/Cảnh cáo.
export function ReportActionBar({
  severeLabel,
  pending,
  onDismiss,
  onWarn,
  onSevere,
}: {
  severeLabel?: string;
  pending: boolean;
  onDismiss: () => void;
  onWarn: (severity: Severity) => void;
  onSevere?: (severity: Severity) => void;
}) {
  const [severity, setSeverity] = React.useState<Severity>('light');

  return (
    <div className="border-stone-75 mt-3.5 flex flex-wrap items-center gap-2 border-t pt-3">
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value as Severity)}
        className="border-border h-9 rounded-md border bg-white px-2 text-xs"
      >
        {SEVERITY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={pending}
        onClick={onDismiss}
        className={cn(
          'bg-primary text-primary-foreground h-9 rounded-md px-3 text-xs font-semibold disabled:opacity-50',
        )}
      >
        Giữ — bác report
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => onWarn(severity)}
        className="border-border h-9 rounded-md border px-3 text-xs font-medium disabled:opacity-50"
      >
        Cảnh cáo
      </button>
      {onSevere && severeLabel ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => onSevere(severity)}
          className="bg-admin-red h-9 rounded-md px-3 text-xs font-semibold text-white disabled:opacity-50"
        >
          {severeLabel}
        </button>
      ) : null}
    </div>
  );
}
