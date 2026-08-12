import { colors } from '@pho-minh/design-tokens';

import { hexToRgb } from '@/lib/color';
import type { GridBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';

const GREEN_RGB = hexToRgb(colors.adminGreen.DEFAULT);

export function GridBlockView({ block }: { block: GridBlock }) {
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
          <div className="w-36 flex-none" />
          {block.cols.map((c) => (
            <div
              key={c}
              className="flex-1 text-center text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
              {c}
            </div>
          ))}
        </div>
        {block.rows.map((row) => (
          <div key={row.l} className="mt-1 flex items-center gap-0.5">
            <div className="w-36 flex-none text-xs text-stone-600">{row.l}</div>
            {row.cells.map((cell, i) => (
              <div
                key={i}
                className="mx-0.5 flex-1 rounded-md py-2 text-center text-xs font-semibold"
                style={{
                  background: `rgba(${GREEN_RGB}, ${((cell.p / 100) * 0.85).toFixed(2)})`,
                  color: cell.p > 45 ? 'white' : undefined,
                }}
              >
                {cell.v}
              </div>
            ))}
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
