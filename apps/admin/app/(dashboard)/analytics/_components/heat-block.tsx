import { colors } from '@pho-minh/design-tokens';

import { hexToRgb } from '@/lib/color';
import type { HeatBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';

const GREEN_RGB = hexToRgb(colors.adminGreen.DEFAULT);
const RED_RGB = hexToRgb(colors.adminRed.DEFAULT);

function heatBackground(p: number): string {
  if (p < 30) return `rgba(${RED_RGB}, ${(0.18 + ((30 - p) / 30) * 0.62).toFixed(2)})`;
  return `rgba(${GREEN_RGB}, ${(0.12 + (p / 100) * 0.7).toFixed(2)})`;
}

export function HeatBlockView({ block }: { block: HeatBlock }) {
  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4">
        <div className="flex">
          <div className="w-12 flex-none" />
          {block.cols.map((c) => (
            <div key={c} className="flex-1 text-center font-mono text-xs text-stone-500">
              {c}
            </div>
          ))}
        </div>
        {block.rows.map((row) => (
          <div key={row.l} className="mt-0.5 flex items-center gap-0.5">
            <div className="w-12 flex-none text-xs text-stone-600">{row.l}</div>
            {row.cells.map((cell, i) => (
              <div
                key={i}
                className="flex-1 rounded-md py-1.5 text-center text-xs font-semibold"
                style={{
                  background: heatBackground(cell.p),
                  color: cell.p > 55 || cell.p < 12 ? 'white' : undefined,
                }}
              >
                {cell.v}
              </div>
            ))}
          </div>
        ))}
        {block.legend && (
          <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-stone-600">
            <span className="bg-admin-red h-3.5 w-3.5 rounded" style={{ opacity: 0.65 }} />
            ít bài
            <span className="bg-admin-green h-3.5 w-3.5 rounded" style={{ opacity: 0.28 }} />
            trung bình
            <span className="bg-admin-green h-3.5 w-3.5 rounded" style={{ opacity: 0.8 }} />
            nhiều bài
            <span className="flex-1 text-right leading-snug">{block.legend}</span>
          </div>
        )}
      </div>
    </AnalyticsCard>
  );
}
