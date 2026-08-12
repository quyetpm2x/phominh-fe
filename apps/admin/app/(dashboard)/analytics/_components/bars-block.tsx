import { cn } from '@pho-minh/ui';

import type { BarsBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';
import { toneBg } from './tone';

export function BarsBlockView({ block }: { block: BarsBlock }) {
  const max = Math.max(...block.data.map((d) => d.v));

  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 flex h-36 items-end gap-2.5">
        {block.data.map((d, i) => (
          <div
            key={`${i}-${d.l}`}
            className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
          >
            <span className="text-xs font-semibold tabular-nums">{d.fmt ?? d.v}</span>
            <div
              className={cn(
                'w-full rounded-t',
                d.tone ? toneBg(d.tone) : 'bg-admin-green-soft-border',
              )}
              style={{ height: `${Math.max(4, Math.round((d.v / max) * 100))}%` }}
            />
            <span className="text-center text-xs leading-tight text-stone-600">{d.l}</span>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
