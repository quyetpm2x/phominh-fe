import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// Chi phí vận hành — G8 (tài liệu nghiệp vụ).
export default function AnalyticsG8Page() {
  const tab = GTABS.G8;

  return (
    <ScreenAccessGuard screen="G8">
      <AnalyticsChrome current="G8" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
