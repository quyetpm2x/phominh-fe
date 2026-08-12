import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Lớp dữ liệu chính thống — E3 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function ContentOpsE3Page() {
  return (
    <ScreenAccessGuard screen="E3">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.E3!} />
    </ScreenAccessGuard>
  );
}
