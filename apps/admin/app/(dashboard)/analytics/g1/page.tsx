import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// Tổng quan — Bắc Đẩu — G1 (tài liệu nghiệp vụ).
export default function AnalyticsG1Page() {
  const tab = GTABS.G1;

  return (
    <ScreenAccessGuard screen="G1">
      <AnalyticsChrome current="G1" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
