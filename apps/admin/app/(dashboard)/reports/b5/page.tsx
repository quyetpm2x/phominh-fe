import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { EMERGENCIES } from '@/lib/mock/reports';

// Xác minh tin khẩn cấp — B5 (tài liệu nghiệp vụ).
export default function ReportsB5Page() {
  return (
    <ScreenAccessGuard screen="B5">
      <div className="flex flex-col gap-3.5">
        {EMERGENCIES.map((e) => (
          <EmergencyCard key={e.title} emergency={e} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}

function EmergencyCard({ emergency: e }: { emergency: (typeof EMERGENCIES)[number] }) {
  return (
    <div className="border-border bg-background flex items-start gap-5 rounded-lg border p-5">
      <div className="flex-1">
        <div className="flex items-center gap-2.5">
          <Pill tone={e.tone}>{e.kind}</Pill>
          <span className="font-mono text-xs text-stone-500">
            {e.time} · {e.area}
          </span>
        </div>
        <div className="mt-2.5 text-base font-semibold leading-snug">{e.title}</div>
        <div className="mt-1.5 max-w-xl text-sm leading-relaxed text-stone-700">{e.body}</div>
        <div className="mt-3 flex items-center gap-2.5">
          <div className="bg-muted h-1.5 w-44 overflow-hidden rounded-full">
            <div className="bg-primary h-full" style={{ width: `${e.pct}%` }} />
          </div>
          <span className="text-xs text-stone-700">{e.confirm}</span>
        </div>
      </div>
      <div className="flex w-48 flex-none flex-col gap-2">
        <button
          type="button"
          className="h-9 rounded-md bg-stone-900 text-xs font-semibold text-white"
        >
          Đẩy hiển thị rộng
        </button>
        <button type="button" className="border-border h-9 rounded-md border text-xs font-medium">
          Đánh dấu đã giải quyết
        </button>
        <button
          type="button"
          className="border-admin-red-soft-border text-admin-red h-9 rounded-md border text-xs font-medium"
        >
          Bác bỏ — tin giả
        </button>
      </div>
    </div>
  );
}
