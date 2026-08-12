import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Log truy cập dữ liệu — F3 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function LegalF3Page() {
  return (
    <ScreenAccessGuard screen="F3">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.F3!} />
    </ScreenAccessGuard>
  );
}
