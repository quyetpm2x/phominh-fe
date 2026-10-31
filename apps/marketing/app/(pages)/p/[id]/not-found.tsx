import Link from 'next/link';

import { BRAND } from '../../../../lib/constants';

// Bài không tồn tại, đã hết hạn hoặc đã bị gỡ — backend trả 404 cho cả 3 trường hợp.
export default function SharedPostNotFound() {
  return (
    <main className="mx-auto max-w-[620px] px-4 pb-[90px] pt-16 text-center sm:px-6">
      <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">KHÔNG TÌM THẤY</div>
      <h1 className="mt-3 text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">
        Bài viết không còn hiển thị
      </h1>
      <p className="mt-4 text-[16px] leading-[1.65] text-gray-800 [text-wrap:pretty]">
        Bài có thể đã hết hạn, đã bị tác giả xoá hoặc không tồn tại. Tin trên {BRAND} tự ẩn sau một
        thời gian để khu phố luôn là chuyện đang xảy ra.
      </p>
      <Link
        href="/"
        className="from-primary mt-7 inline-block rounded-2xl bg-gradient-to-br to-[#1A4794] px-6 py-3.5 text-base font-bold text-white no-underline"
      >
        Về trang chủ {BRAND}
      </Link>
    </main>
  );
}
