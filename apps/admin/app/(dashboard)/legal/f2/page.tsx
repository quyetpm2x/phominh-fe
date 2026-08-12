import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Yêu cầu xóa dữ liệu — F2 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function LegalF2Page() {
  return (
    <ScreenAccessGuard screen="F2">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.F2!} />
    </ScreenAccessGuard>
  );
}
