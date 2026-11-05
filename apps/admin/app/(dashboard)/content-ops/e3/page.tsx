import { NotEnabledNotice } from '@/components/not-enabled-notice';

// Lớp dữ liệu chính thống — E3. Chưa tích hợp nguồn bên ngoài nào.
export default function ContentOpsE3Page() {
  return (
    <NotEnabledNotice title="Chưa kết nối nguồn dữ liệu chính thống">
      App hiện chỉ có nội dung cộng đồng. Trang này sẽ dùng được sau khi tích hợp một nguồn đã xác
      thực, ví dụ HSDC Maps.
    </NotEnabledNotice>
  );
}
