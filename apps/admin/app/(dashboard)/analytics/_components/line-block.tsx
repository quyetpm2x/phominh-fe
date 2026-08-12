import type { LineBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';

function computeGeometry(block: LineBlock) {
  const values = block.data.map((d) => d.v);
  const max = block.max ?? Math.max(...values) * 1.12;
  const min = block.min ?? 0;
  const n = values.length;

  const x = (i: number) => (n === 1 ? 0 : (i / (n - 1)) * 100);
  const y = (v: number) => 40 - ((v - min) / (max - min)) * 37;
  const line = values.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');

  return {
    areaPts: `0,40 ${line} 100,40`,
    line,
    threshY: block.thresh != null ? y(block.thresh).toFixed(2) : null,
    max,
    min,
    // block.data luôn có ít nhất 1 điểm (dữ liệu mock tĩnh, không rỗng).
    last: values[n - 1]!,
  };
}

export function LineBlockView({ block }: { block: LineBlock }) {
  const fmt = block.fmt ?? ((v: number) => String(Math.round(v)));
  const geo = computeGeometry(block);
  const lastPoint = block.data[block.data.length - 1]!;
  const lastLabel = lastPoint.fmt ?? fmt(geo.last);

  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 flex items-stretch gap-2.5">
        <div className="min-w-0 flex-1">
          <LineChartSvg areaPts={geo.areaPts} line={geo.line} threshY={geo.threshY} />
          <div className="mt-2 flex justify-between">
            {block.data.map((d, i) => (
              <span key={`${i}-${d.l}`} className="font-mono text-xs text-stone-500">
                {d.l}
              </span>
            ))}
          </div>
        </div>
        <div className="flex w-20 flex-none flex-col justify-between pb-5 text-right">
          <span className="font-mono text-xs text-stone-500">{fmt(geo.max)}</span>
          <span className="text-sm font-bold">{lastLabel}</span>
          <span className="font-mono text-xs text-stone-500">{fmt(geo.min)}</span>
        </div>
      </div>
      {block.threshLabel && (
        <div className="text-admin-red mt-1.5 flex items-center gap-2 text-xs">
          <span className="border-admin-red block h-0 w-4 border-t border-dashed" />
          {block.threshLabel}
        </div>
      )}
    </AnalyticsCard>
  );
}

function LineChartSvg({
  areaPts,
  line,
  threshY,
}: {
  areaPts: string;
  line: string;
  threshY: string | null;
}) {
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="block h-36 w-full overflow-visible"
    >
      <polyline points={areaPts} className="fill-admin-green-soft stroke-none" />
      {threshY && (
        <polyline
          points={`0,${threshY} 100,${threshY}`}
          className="stroke-admin-red fill-none"
          strokeWidth={1}
          strokeDasharray="4 3"
          vectorEffect="non-scaling-stroke"
        />
      )}
      <polyline
        points={line}
        className="stroke-admin-green fill-none"
        strokeWidth={2}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
