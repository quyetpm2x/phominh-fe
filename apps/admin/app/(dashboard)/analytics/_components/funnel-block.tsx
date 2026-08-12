import { cn } from '@pho-minh/ui';

import type { FunnelBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';
import { toneBg } from './tone';

export function FunnelBlockView({ block }: { block: FunnelBlock }) {
  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 flex flex-col gap-2">
        {block.steps.map((s, i) => {
          const prev = i > 0 ? block.steps[i - 1] : null;
          const drop = prev ? prev.v - s.v : null;

          return (
            <div key={s.l} className="flex items-center gap-3.5">
              <span className="w-56 flex-none text-xs leading-snug text-stone-600">{s.l}</span>
              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    'flex h-8 items-center justify-center rounded-md text-xs font-semibold',
                    toneBg(s.tone),
                    s.tone === 'neu' ? 'text-foreground' : 'text-white',
                  )}
                  style={{ width: `${s.v}%` }}
                >
                  {s.v}%
                </span>
              </span>
              <span
                className={cn(
                  'w-20 flex-none text-right font-mono text-xs',
                  drop != null && drop >= 15 ? 'text-admin-red' : 'text-stone-500',
                )}
              >
                {drop != null ? `rớt ${drop} điểm` : ''}
              </span>
            </div>
          );
        })}
      </div>
    </AnalyticsCard>
  );
}
