import type { AnalyticsBlock } from '@/lib/mock/analytics';

import { BarsBlockView } from './bars-block';
import { DonutBlockView } from './donut-block';
import { FunnelBlockView } from './funnel-block';
import { GaugeBlockView } from './gauge-block';
import { GridBlockView } from './grid-block';
import { HBarsBlockView } from './hbars-block';
import { HeatBlockView } from './heat-block';
import { HeroBlockView } from './hero-block';
import { LineBlockView } from './line-block';
import { ListBlockView } from './list-block';
import { TableBlockView } from './table-block';

export function AnalyticsBlockView({ block }: { block: AnalyticsBlock }) {
  switch (block.kind) {
    case 'hero':
      return <HeroBlockView block={block} />;
    case 'bars':
      return <BarsBlockView block={block} />;
    case 'hbars':
      return <HBarsBlockView block={block} />;
    case 'grid':
      return <GridBlockView block={block} />;
    case 'list':
      return <ListBlockView block={block} />;
    case 'line':
      return <LineBlockView block={block} />;
    case 'heat':
      return <HeatBlockView block={block} />;
    case 'donut':
      return <DonutBlockView block={block} />;
    case 'funnel':
      return <FunnelBlockView block={block} />;
    case 'gauge':
      return <GaugeBlockView block={block} />;
    case 'table':
      return <TableBlockView block={block} />;
    default:
      return null;
  }
}
