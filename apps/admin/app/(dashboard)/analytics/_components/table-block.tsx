import { cn } from '@pho-minh/ui';

import type { TableBlock, TableCell } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';
import { toneText } from './tone';

function isCell(v: string | TableCell): v is TableCell {
  return typeof v === 'object';
}

export function TableBlockView({ block }: { block: TableBlock }) {
  const gridTemplateColumns = `repeat(${block.cols.length}, minmax(0, 1fr))`;

  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-4 overflow-hidden rounded-md border border-stone-100">
        <div className="grid gap-0 bg-stone-50 px-1" style={{ gridTemplateColumns }}>
          {block.cols.map((c) => (
            <div
              key={c}
              className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
              {c}
            </div>
          ))}
        </div>
        {block.rows.map((row, ri) => (
          <div
            key={ri}
            className="grid gap-0 border-t border-stone-100 px-1"
            style={{ gridTemplateColumns }}
          >
            {row.map((cell, ci) => {
              const c = isCell(cell) ? cell : { v: cell };
              return (
                <div
                  key={ci}
                  className={cn(
                    'px-2 py-2.5 text-sm',
                    c.bold && 'font-semibold',
                    c.tone && toneText(c.tone),
                    c.right && 'text-right',
                  )}
                >
                  {c.v}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
