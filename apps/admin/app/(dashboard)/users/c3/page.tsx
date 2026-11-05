import Link from 'next/link';

import { NotEnabledNotice } from '@/components/not-enabled-notice';

// Thông đồng vote — C3. Thuật toán phát hiện đã hoãn có chủ ý nên bảng collusion_flags chưa có nguồn ghi.
export default function UsersC3Page() {
  return (
    <NotEnabledNotice title="Chưa có thuật toán phát hiện thông đồng vote">
      Hệ thống chưa quét các cụm tài khoản vote qua lại nên trang này chưa có dữ liệu. Trong lúc đó,
      admin có thể xem và huỷ phiếu tin tưởng của từng người ở{' '}
      <Link href="/users/c8" className="text-primary font-medium">
        C8
      </Link>
      .
    </NotEnabledNotice>
  );
}
