import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Khóa/mở khóa tài khoản — C5 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function UsersC5Page() {
  return (
    <ScreenAccessGuard screen="C5">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.C5!} />
    </ScreenAccessGuard>
  );
}
