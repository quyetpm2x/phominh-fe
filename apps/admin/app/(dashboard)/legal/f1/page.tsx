import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Điều khoản & chính sách — F1 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function LegalF1Page() {
  return (
    <ScreenAccessGuard screen="F1">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.F1!} />
    </ScreenAccessGuard>
  );
}
