import Link from 'next/link';

import { NotEnabledNotice } from '@/components/not-enabled-notice';

// Cụm tấn công tự động — B4. Thuật toán đã hoãn có chủ ý nên bảng comment_attack_incidents chưa có nguồn ghi.
export default function ReportsB4Page() {
  return (
    <NotEnabledNotice title="Chưa có cơ chế tự phát hiện tấn công bình luận">
      Hệ thống chưa tự tạm khoá bình luận khi nhiều tài khoản dồn vào một bài nên trang này chưa có
      dữ liệu. Bình luận bị báo cáo vẫn được xử lý ở{' '}
      <Link href="/reports/b2" className="text-primary font-medium">
        B2
      </Link>
      .
    </NotEnabledNotice>
  );
}
