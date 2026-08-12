import { colors } from '@pho-minh/design-tokens';

import type { ChartTone, GaugeBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';

const GAUGE_COLOR: Record<ChartTone, string> = {
  ok: colors.adminGreen.DEFAULT,
  warn: colors.adminAmber.DEFAULT,
  bad: colors.adminRed.DEFAULT,
  neu: colors.stone[400],
};

export function GaugeBlockView({ block }: { block: GaugeBlock }) {
  const color = GAUGE_COLOR[block.tone ?? 'ok'];
  const deg = (block.pct * 1.8).toFixed(1);

  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div className="relative h-28 w-56 flex-none overflow-hidden">
          <div
            className="absolute left-0 top-0 h-56 w-56 rounded-full"
            style={{
              background: `conic-gradient(from 270deg, ${color} 0deg ${deg}deg, ${colors.stone[150]} ${deg}deg 180deg, transparent 180deg 360deg)`,
            }}
          />
          <div className="bg-background absolute inset-x-0 top-8 mx-auto h-40 w-40 rounded-full" />
          <div className="absolute bottom-0 left-0 w-56 text-center">
            <div className="text-3xl font-bold tracking-tight">{block.value}</div>
            <div className="mt-0.5 text-xs text-stone-600">{block.sub}</div>
          </div>
        </div>
        <div className="min-w-0 flex-1 text-sm leading-relaxed text-stone-700">{block.target}</div>
      </div>
    </AnalyticsCard>
  );
}
