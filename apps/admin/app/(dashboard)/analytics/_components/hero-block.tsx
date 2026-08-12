import type { HeroBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';

export function HeroBlockView({ block }: { block: HeroBlock }) {
  const max = Math.max(...block.data.map((d) => d.v));

  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-3.5 flex items-end gap-4">
        <div className="text-6xl font-bold tracking-tight">{block.value}</div>
        <div className="flex flex-col gap-0.5 pb-2.5">
          <span className="text-primary text-sm font-semibold">{block.arrow}</span>
          <span className="text-xs text-stone-600">{block.note}</span>
        </div>
      </div>
      <div className="mt-5 flex h-28 items-end gap-1.5">
        {block.data.map((d, i) => (
          <div
            key={`${i}-${d.l}`}
            className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
          >
            <span className="font-mono text-xs text-stone-500">{d.fmt ?? d.v}</span>
            <div
              className="bg-admin-green-soft-border w-full rounded-t"
              style={{ height: `${Math.max(4, Math.round((d.v / max) * 100))}%` }}
            />
            <span className="h-3 text-xs text-stone-500">{d.l}</span>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
