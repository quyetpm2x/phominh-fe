import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Report bán chuyên nghiệp — D2 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function MerchantsD2Page() {
  return (
    <ScreenAccessGuard screen="D2">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.D2!} />
    </ScreenAccessGuard>
  );
}
