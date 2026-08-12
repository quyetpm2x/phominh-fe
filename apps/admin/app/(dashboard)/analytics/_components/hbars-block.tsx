import { cn } from '@pho-minh/ui';

import type { HBarsBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';
import { toneBg } from './tone';

export function HBarsBlockView({ block }: { block: HBarsBlock }) {
  const max = Math.max(...block.data.map((d) => d.v));

  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 flex flex-col gap-2.5">
        {block.data.map((d) => (
          <div key={d.l} className="flex items-center gap-3">
            <span className="w-32 flex-none text-xs leading-snug text-stone-600">{d.l}</span>
            <span className="h-4 flex-1 rounded-md bg-stone-100">
              <span
                className={cn(
                  'block h-full rounded-md',
                  d.tone ? toneBg(d.tone) : 'bg-admin-green-soft-border',
                )}
                style={{ width: `${Math.max(2, Math.round((d.v / max) * 100))}%` }}
              />
            </span>
            <span className="w-20 flex-none text-right text-xs font-semibold tabular-nums">
              {d.fmt ?? d.v}
            </span>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
