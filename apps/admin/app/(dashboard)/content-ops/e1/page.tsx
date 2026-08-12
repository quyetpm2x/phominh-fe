import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Đăng bài mồi thủ công — E1 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function ContentOpsE1Page() {
  return (
    <ScreenAccessGuard screen="E1">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.E1!} />
    </ScreenAccessGuard>
  );
}
