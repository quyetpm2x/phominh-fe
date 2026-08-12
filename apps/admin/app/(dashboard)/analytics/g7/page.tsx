import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// An toàn & kiểm duyệt — G7 (tài liệu nghiệp vụ).
export default function AnalyticsG7Page() {
  const tab = GTABS.G7;

  return (
    <ScreenAccessGuard screen="G7">
      <AnalyticsChrome current="G7" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
