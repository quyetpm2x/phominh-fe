import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Report bình luận — B2 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function ReportsB2Page() {
  return (
    <ScreenAccessGuard screen="B2">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.B2!} />
    </ScreenAccessGuard>
  );
}
