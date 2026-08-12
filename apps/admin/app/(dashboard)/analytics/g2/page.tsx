import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// Sức khỏe nội dung — G2 (tài liệu nghiệp vụ).
export default function AnalyticsG2Page() {
  const tab = GTABS.G2;

  return (
    <ScreenAccessGuard screen="G2">
      <AnalyticsChrome current="G2" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
