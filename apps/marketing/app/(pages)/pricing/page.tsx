import type { Metadata } from 'next';
import Link from 'next/link';

import { PREMIUM_PRICE, PRICING_LIVE } from '../../../lib/constants';

export const metadata: Metadata = {
  title: 'Bảng giá cho tiểu thương',
  description: 'Giá thế nào, nói thẳng ngay từ đầu.',
};

export default function PricingPage() {
  const trial = !PRICING_LIVE;

  return (
    <main className="pt-18 mx-auto max-w-[980px] px-6 pb-[90px]">
      <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">
        BẢNG GIÁ CHO TIỂU THƯƠNG
      </div>
      <h1 className="mt-3.5 max-w-[640px] text-[44px] font-bold leading-[1.1] tracking-[-0.025em] [text-wrap:pretty]">
        Giá thế nào, nói thẳng ngay từ đầu
      </h1>

      {trial ? (
        <>
          <div className="border-accent-soft-border mt-7 rounded-[20px] border-[1.5px] bg-white p-8">
            <div className="bg-primary-soft-100 text-primary-darker inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold">
              <span className="bg-success h-1.5 w-1.5 rounded-full" />
              GIAI ĐOẠN THỬ NGHIỆM
            </div>
            <div className="mt-4 text-[30px] font-bold tracking-[-0.02em]">
              Miễn phí trong giai đoạn thử nghiệm
            </div>
            <p className="mt-3 max-w-[620px] text-[17px] leading-[1.65] text-gray-800 [text-wrap:pretty]">
              Chúng tôi chưa thu phí của bất kỳ quán nào. Mọi tính năng đăng bài đang mở miễn phí
              cho các quán trong khu thí điểm. Khi bắt đầu thu phí, chúng tôi sẽ báo trước ít nhất
              30 ngày và bảng giá sẽ hiện tại đây.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/merchant"
                className="bg-ink rounded-[13px] px-[22px] py-3.5 text-[15.5px] font-semibold text-white no-underline"
              >
                Đăng ký cho quán mình
              </Link>
              <Link
                href="/contact"
                className="border-gray-450 text-foreground rounded-[13px] border-[1.5px] px-[22px] py-3.5 text-[15.5px] font-semibold no-underline"
              >
                Hỏi thêm
              </Link>
            </div>
          </div>
          <p className="mt-8.5 max-w-[640px] text-[14.5px] leading-[1.65] text-gray-800 [text-wrap:pretty]">
            Dưới đây là hai gói dự kiến khi bật thu phí, để anh chị biết trước sẽ có gì. Chưa gói
            nào đang bán.
          </p>
        </>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border-border flex flex-col rounded-[20px] border bg-white p-[30px]">
          <div className="text-xl font-bold">Miễn phí</div>
          <div className="mt-1.5 text-[14.5px] text-gray-800">
            Đủ cho quán nhỏ đăng tin mỗi ngày
          </div>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-[-0.02em]">0đ</span>
            <span className="text-[15px] text-gray-800">/ tháng</span>
          </div>
          <div className="mt-6 flex flex-1 flex-col gap-3.5">
            <PlanRow dot="bg-accent-soft-100">Đăng 2 bài mỗi ngày</PlanRow>
            <PlanRow dot="bg-accent-soft-100">
              Trang quán với giờ mở cửa và nút gọi Zalo theo giờ
            </PlanRow>
            <PlanRow dot="bg-accent-soft-100">Bài tự hết hạn sau 24 giờ</PlanRow>
            <PlanRow dot="bg-accent-soft-100">Tổng lượt xem của mỗi bài</PlanRow>
          </div>
          <Link
            href="/merchant"
            className="mt-6.5 border-gray-450 text-foreground flex h-[52px] items-center justify-center rounded-[13px] border-[1.5px] text-[15.5px] font-semibold no-underline"
          >
            Bắt đầu miễn phí
          </Link>
        </div>

        <div className="border-accent-soft-border-strong flex flex-col rounded-[20px] border-[1.5px] bg-[linear-gradient(165deg,#FFFFFF,#FDF0E2)] p-[30px] shadow-[0_10px_30px_rgba(255,201,60,.14)]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-bold">Premium Listing</span>
            <span className="bg-accent-soft-200 text-accent-text rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold">
              DỰ KIẾN
            </span>
          </div>
          <div className="mt-1.5 text-[14.5px] text-gray-800">
            Cho quán đăng nhiều lần trong ngày
          </div>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-accent-text text-4xl font-bold tracking-[-0.02em]">
              {PREMIUM_PRICE}
            </span>
            <span className="text-[15px] text-gray-800">/ tháng</span>
          </div>
          <div className="mt-6 flex flex-1 flex-col gap-3.5">
            <PlanRow dot="bg-accent-soft-200">Đăng không giới hạn số bài mỗi ngày</PlanRow>
            <PlanRow dot="bg-accent-soft-200">Ghim ưu tiên một bài trong khu vực của quán</PlanRow>
            <PlanRow dot="bg-accent-soft-200">
              Thống kê chi tiết: lượt xem theo giờ, số người lưu bài, khoảng cách khách
            </PlanRow>
            <PlanRow dot="bg-accent-soft-200">Hỗ trợ qua Zalo trong giờ hành chính</PlanRow>
          </div>
          <Link
            href="/contact"
            className="mt-6.5 from-primary flex h-[52px] items-center justify-center rounded-[13px] bg-gradient-to-br to-[#1A4794] text-[15.5px] font-bold text-white no-underline transition-transform hover:-translate-y-px"
          >
            Nhận thông báo khi mở bán
          </Link>
        </div>
      </div>

      <div className="mt-5.5 border-border p-5.5 rounded-2xl border bg-gray-100 text-[14.5px] leading-[1.7] text-gray-800 [text-wrap:pretty]">
        Chỉ có hai gói, và sẽ giữ như vậy. Ghim ưu tiên luôn được ghi rõ là bài của đối tác — hàng
        xóm cần biết cái gì là quảng cáo. Không có gói nào mua được vị trí trong phần tin khẩn cấp
        của khu.
      </div>
    </main>
  );
}

function PlanRow({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <span className={`mt-0.5 h-[18px] w-[18px] flex-none rounded-[5px] ${dot}`} />
      <span className="text-[14.5px] leading-[1.55] text-gray-900">{children}</span>
    </div>
  );
}
