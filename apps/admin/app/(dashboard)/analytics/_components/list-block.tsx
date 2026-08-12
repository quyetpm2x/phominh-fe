import { Pill } from '@/components/pill';
import type { ListBlock } from '@/lib/mock/analytics';

import { AnalyticsCard } from './analytics-card';
import { toPillTone } from './tone';

export function ListBlockView({ block }: { block: ListBlock }) {
  return (
    <AnalyticsCard
      title={block.title}
      desc={block.desc}
      action={block.action}
      foot={block.foot}
      wide={block.wide}
    >
      <div className="mt-3">
        {block.items.map((it) => (
          <div
            key={it.text}
            className="flex items-center gap-3 border-t border-stone-100 py-2.5 first:border-0"
          >
            <span className="flex-1 text-sm leading-relaxed">{it.text}</span>
            <Pill tone={toPillTone(it.tone)}>{it.status}</Pill>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}
