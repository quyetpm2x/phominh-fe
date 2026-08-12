import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// Tăng trưởng & kích hoạt — G3 (tài liệu nghiệp vụ).
export default function AnalyticsG3Page() {
  const tab = GTABS.G3;

  return (
    <ScreenAccessGuard screen="G3">
      <AnalyticsChrome current="G3" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
