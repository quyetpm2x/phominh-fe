import Link from 'next/link';

import { BRAND, BRAND_LOGO_LETTER, CONTACT_EMAILS, CONTACT_PHONE } from '../lib/constants';

import { StoreButtons } from './StoreButtons';

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="from-ink mt-0 bg-gradient-to-b to-[#171A20] text-[#E8EBEE]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-9 px-6 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="from-primary flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-gradient-to-br to-[#1A4794] text-[15px] font-bold text-white">
              {BRAND_LOGO_LETTER}
            </span>
            <span className="text-[16.5px] font-bold text-white">{BRAND}</span>
          </div>
          <p className="mt-3.5 max-w-[280px] text-sm leading-[1.65] text-gray-600 [text-wrap:pretty]">
            Mạng xã hội của khu mình đang ở. Mở app là biết ngay chuyện quanh mình.
          </p>
          <StoreButtons />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="font-mono text-[11px] tracking-[0.06em] text-gray-600">SẢN PHẨM</div>
          <Link href="/" className="text-[14.5px] text-[#E8EBEE] no-underline">
            Trang chủ
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="font-mono text-[11px] tracking-[0.06em] text-gray-600">PHÁP LÝ</div>
          <Link href="/legal#dk" className="text-[14.5px] text-[#E8EBEE] no-underline">
            Điều khoản sử dụng
          </Link>
          <Link href="/legal#qrt" className="text-[14.5px] text-[#E8EBEE] no-underline">
            Chính sách quyền riêng tư
          </Link>
          <span className="text-[13px] leading-[1.6] text-gray-600">
            Theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="font-mono text-[11px] tracking-[0.06em] text-gray-600">LIÊN HỆ</div>
          <Link href="/contact" className="text-[14.5px] text-[#E8EBEE] no-underline">
            Liên hệ &amp; FAQ
          </Link>
          <span className="text-sm text-gray-600">Hỗ trợ: {CONTACT_EMAILS.support}</span>
          <span className="text-sm text-gray-600">{CONTACT_PHONE} · 8h–18h</span>
        </div>
      </div>

      <div className="border-t border-white/[0.14]">
        <div className="py-4.5 mx-auto flex max-w-[1120px] flex-wrap justify-between gap-4 px-6 text-[13px] text-gray-600">
          <span>
            © {YEAR} {BRAND}. Đang trong giai đoạn thử nghiệm tại Hà Nội.
          </span>
          <span>Hà Nội, Việt Nam</span>
        </div>
      </div>
    </footer>
  );
}
