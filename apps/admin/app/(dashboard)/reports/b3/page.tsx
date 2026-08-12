import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Bình luận riêng tư bị report — B3 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function ReportsB3Page() {
  return (
    <ScreenAccessGuard screen="B3">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.B3!} />
    </ScreenAccessGuard>
  );
}
