import { ScreenAccessGuard } from '@/components/screen-banner';
import { SpecPlaceholder } from '@/components/spec-placeholder';
import { PLACEHOLDER_SCREENS } from '@/lib/mock/placeholders';

// Giám sát ẩn/hiện SĐT — D3 (tài liệu nghiệp vụ). Chưa có UI thiết kế trong Admin.dc.html.
export default function MerchantsD3Page() {
  return (
    <ScreenAccessGuard screen="D3">
      <SpecPlaceholder screen={PLACEHOLDER_SCREENS.D3!} />
    </ScreenAccessGuard>
  );
}
