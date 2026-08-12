import { cn } from '@pho-minh/ui';

import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { AREAS, type AreaCard } from '@/lib/mock/areas';

// Quản lý khu vực thí điểm — E2 (tài liệu nghiệp vụ).
export default function ContentOpsE2Page() {
  return (
    <ScreenAccessGuard screen="E2">
      <div className="grid grid-cols-2 gap-3.5">
        {AREAS.map((a) => (
          <AreaCardView key={a.name} area={a} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}

function AreaCardView({ area: a }: { area: AreaCard }) {
  return (
    <div className="border-border bg-background rounded-lg border p-5">
      <div className="flex items-center gap-2.5">
        <div className="text-base font-semibold">{a.name}</div>
        <Pill tone={a.tone}>{a.status}</Pill>
        <span className="flex-1" />
        <div
          className={cn(
            'flex h-6 w-10 rounded-full p-0.5',
            a.on ? 'bg-admin-green justify-end' : 'justify-start bg-stone-300',
          )}
        >
          <span className="block h-5 w-5 rounded-full bg-white" />
        </div>
      </div>
      <div className="mt-1 text-xs text-stone-600">
        Mở từ {a.since} · {a.radius}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {a.stats.map((s) => (
          <div key={s.k}>
            <div className="text-lg font-bold tracking-tight">{s.v}</div>
            <div className="mt-0.5 text-xs leading-snug text-stone-600">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
