import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Tín hiệu gian lận — C4 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function UsersC4Page() {
  return (
    <ScreenAccessGuard screen="C4">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.C4!} />
    </ScreenAccessGuard>
  );
}
