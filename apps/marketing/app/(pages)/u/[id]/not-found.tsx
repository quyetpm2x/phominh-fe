import Link from 'next/link';

import { BRAND } from '../../../../lib/constants';

// Hồ sơ không tồn tại hoặc tài khoản không còn hoạt động — backend trả 404 cho cả 2 trường hợp.
export default function SharedProfileNotFound() {
  return (
    <main className="mx-auto max-w-[620px] px-4 pb-[90px] pt-16 text-center sm:px-6">
      <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">KHÔNG TÌM THẤY</div>
      <h1 className="mt-3 text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">
        Hồ sơ không còn hiển thị
      </h1>
      <p className="mt-4 text-[16px] leading-[1.65] text-gray-800 [text-wrap:pretty]">
        Tài khoản này có thể không còn hoạt động trên {BRAND}.
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
