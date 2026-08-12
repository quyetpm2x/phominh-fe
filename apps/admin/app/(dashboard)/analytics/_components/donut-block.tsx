import { colors } from '@pho-minh/design-tokens';
import { cn } from '@pho-minh/ui';

import type { ChartTone, DonutBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';
import { toneBg } from './tone';

const SEG_COLOR: Record<ChartTone, string> = {
  ok: colors.adminGreen.DEFAULT,
  warn: colors.adminAmber.DEFAULT,
  bad: colors.adminRed.DEFAULT,
  neu: colors.stone[400],
};

function conicGradient(segs: DonutBlock['segs']): string {
  let acc = 0;
  const parts = segs.map((s) => {
    const from = acc;
    const to = acc + s.pct;
    acc = to;
    const color = s.tone ? SEG_COLOR[s.tone] : SEG_COLOR.neu;
    return `${color} ${from}% ${to}%`;
  });
  return `conic-gradient(${parts.join(', ')})`;
}

export function DonutBlockView({ block }: { block: DonutBlock }) {
  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div className="relative h-40 w-40 flex-none">
          <div
            className="h-full w-full rounded-full"
            style={{ background: conicGradient(block.segs) }}
          />
          <div className="bg-background absolute inset-7 flex flex-col items-center justify-center rounded-full">
            <span className="text-2xl font-bold tracking-tight">{block.center}</span>
            <span className="mt-0.5 text-xs text-stone-600">{block.centerNote}</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {block.segs.map((s) => (
            <div key={s.l} className="flex items-center gap-2.5 text-sm text-stone-700">
              <span className={cn('h-2.5 w-2.5 flex-none rounded-sm', toneBg(s.tone))} />
              <span className="flex-1">{s.l}</span>
              <strong className="text-foreground">{s.v}</strong>
            </div>
          ))}
        </div>
      </div>
    </AnalyticsCard>
  );
}
