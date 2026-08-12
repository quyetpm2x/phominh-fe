import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// Chỉ số merchant — G6 (tài liệu nghiệp vụ).
export default function AnalyticsG6Page() {
  const tab = GTABS.G6;

  return (
    <ScreenAccessGuard screen="G6">
      <AnalyticsChrome current="G6" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
