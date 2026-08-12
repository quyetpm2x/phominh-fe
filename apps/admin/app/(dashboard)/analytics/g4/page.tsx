import { ScreenAccessGuard } from '@/components/screen-banner';
import { GTABS } from '@/lib/mock/analytics';

import { AnalyticsBlockView } from '../_components/analytics-block';
import { AnalyticsChrome } from '../_components/analytics-chrome';

// Giữ chân người dùng — G4 (tài liệu nghiệp vụ).
export default function AnalyticsG4Page() {
  const tab = GTABS.G4;

  return (
    <ScreenAccessGuard screen="G4">
      <AnalyticsChrome current="G4" />
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        {tab.blocks.map((b) => (
          <AnalyticsBlockView key={b.title} block={b} />
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
