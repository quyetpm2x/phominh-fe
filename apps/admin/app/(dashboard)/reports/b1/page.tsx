import { cn } from '@pho-minh/ui';

import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { REPORT_TABS, REPORTS, SELECTED_REPORT } from '@/lib/mock/reports';

// Report bài đăng — B1 (tài liệu nghiệp vụ).
export default function ReportsB1Page() {
  return (
    <ScreenAccessGuard screen="B1">
      <div className="flex items-start gap-4">
        <ReportListCard />
        <ReportDetailCard />
      </div>
    </ScreenAccessGuard>
  );
}

function ReportListCard() {
  return (
    <div className="border-border bg-background flex-1 overflow-hidden rounded-lg border">
      <div className="flex gap-2 border-b border-stone-100 px-4 py-3">
        {REPORT_TABS.map((tab, i) => (
          <div
            key={tab}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs',
              i === 0
                ? 'bg-stone-900 font-semibold text-white'
                : 'border border-stone-200 text-stone-700',
            )}
          >
            {tab}
          </div>
        ))}
      </div>
      {REPORTS.map((r, i) => (
        <div
          key={r.title}
          className={cn(
            'flex gap-3.5 border-b border-stone-100 px-4 py-3.5 last:border-0',
            i === 0 && 'bg-stone-50',
          )}
        >
          <div className="h-14 w-14 flex-none rounded-lg bg-stone-100" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium leading-snug">{r.title}</div>
            <div className="mt-0.5 text-xs text-stone-600">{r.meta}</div>
          </div>
          <div className="flex-none text-right">
            <Pill tone={r.tone}>{r.reason}</Pill>
            <div className="mt-1 font-mono text-xs text-stone-500">{r.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportDetailCard() {
  const sel = SELECTED_REPORT;

  return (
    <div className="border-border bg-background w-96 flex-none overflow-hidden rounded-lg border">
      <div className="flex h-52 items-center justify-center bg-stone-100 font-mono text-xs text-stone-600">
        ảnh gốc do người dùng chụp
      </div>
      <div className="p-4">
        <div className="text-sm font-semibold leading-snug">{sel.title}</div>
        <div className="mt-1.5 text-xs leading-relaxed text-stone-700">{sel.body}</div>
        <div className="mt-3.5 overflow-hidden rounded-md border border-stone-200">
          <div className="bg-stone-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-stone-600">
            Metadata ảnh (EXIF)
          </div>
          {sel.exif.map((e) => (
            <div
              key={e.k}
              className="flex justify-between border-t border-stone-100 px-3 py-2 text-xs"
            >
              <span className="text-stone-600">{e.k}</span>
              <span className="font-mono">{e.v}</span>
            </div>
          ))}
        </div>
        <div className="border-admin-green-soft-border bg-admin-green-soft text-admin-green mt-3 rounded-md border px-3 py-2.5 text-xs leading-relaxed">
          {sel.verdict}
        </div>
        <div className="mt-3.5 flex flex-col gap-2">
          <button
            type="button"
            className="bg-primary text-primary-foreground h-10 rounded-md text-sm font-semibold"
          >
            Giữ bài — bác report
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className="border-border h-10 flex-1 rounded-md border text-xs font-medium"
            >
              Cảnh cáo
            </button>
            <button
              type="button"
              className="bg-admin-red h-10 flex-1 rounded-md text-xs font-semibold text-white"
            >
              Gỡ bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
