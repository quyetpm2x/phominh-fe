import { cn } from '@pho-minh/ui';

import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { USER_DETAIL, USER_DETAIL_TABS } from '@/lib/mock/users';

// Chi tiết người dùng — C2 (tài liệu nghiệp vụ).
export default function UsersC2Page() {
  return (
    <ScreenAccessGuard screen="C2">
      <div className="flex items-start gap-4">
        <ProfileCard />
        <TimelineCard />
      </div>
    </ScreenAccessGuard>
  );
}

function ProfileCard() {
  const ud = USER_DETAIL;

  return (
    <div className="border-border bg-background w-72 flex-none rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold">
          {ud.ini}
        </div>
        <div>
          <div className="text-sm font-semibold">{ud.name}</div>
          <div className="font-mono text-xs text-stone-600">{ud.phone}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {ud.facts.map((f) => (
          <div key={f.k} className="flex justify-between border-b border-stone-100 pb-2 text-xs">
            <span className="text-stone-600">{f.k}</span>
            <span className="font-medium">{f.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <button type="button" className="border-border h-10 rounded-md border text-xs font-medium">
          Vô hiệu hóa điểm ảo
        </button>
        <button
          type="button"
          className="bg-admin-red h-10 rounded-md text-xs font-semibold text-white"
        >
          Khóa tài khoản — C5
        </button>
      </div>
    </div>
  );
}

function TimelineCard() {
  const ud = USER_DETAIL;

  return (
    <div className="border-border bg-background flex-1 overflow-hidden rounded-lg border">
      <div className="flex gap-2 border-b border-stone-100 px-4 py-3">
        {USER_DETAIL_TABS.map((tab, i) => (
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
      {ud.timeline.map((t) => (
        <div
          key={`${t.time}-${t.kind}`}
          className="flex items-start gap-3.5 border-b border-stone-100 px-4 py-3.5 last:border-0"
        >
          <span className="w-24 flex-none font-mono text-xs text-stone-500">{t.time}</span>
          <Pill tone={t.tone}>{t.kind}</Pill>
          <span className="flex-1 text-sm leading-relaxed">{t.text}</span>
        </div>
      ))}
    </div>
  );
}
