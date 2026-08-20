import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

import { GTABS } from '@/lib/mock/analytics';

// Tương tác nội dung — G5 (tài liệu nghiệp vụ).
export default function AnalyticsG5Page() {
  const tab = GTABS.G5;

  return (
    <>
      <AnalyticsChrome current="G5" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </>
  );
}
