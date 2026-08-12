import type { Metadata } from 'next';
import Link from 'next/link';

import { MerchantPhoneMockup } from '../../../components/MerchantPhoneMockup';
import { MerchantRegisterForm } from '../../../components/MerchantRegisterForm';
import { BRAND, FREE_MONTHS } from '../../../lib/constants';

export const metadata: Metadata = {
  title: 'Dành cho tiểu thương',
  description: `Thông báo còn hàng gì hôm nay — miễn phí ${FREE_MONTHS} tháng đầu, tới đúng khách hàng cách bạn vài phút đi bộ.`,
};

export default function MerchantPage() {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="text-background relative overflow-hidden bg-[linear-gradient(140deg,#20242B_0%,#2C323C_55%,#20242B_100%)]">
        <div className="gap-13 py-19 mx-auto grid max-w-[1120px] grid-cols-1 items-center px-6 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="border-accent/40 bg-accent/[0.16] text-accent-dark inline-block rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold">
              <span className="whitespace-nowrap">
                Miễn phí {FREE_MONTHS} tháng đầu · không cần thẻ tín dụng
              </span>
            </div>
            <h1 className="mt-5 text-[50px] font-bold leading-[1.08] tracking-[-0.025em] [text-wrap:pretty]">
              Thông báo còn hàng gì hôm nay — tới đúng khách hàng cách bạn vài phút đi bộ
            </h1>
            <p className="mt-4.5 max-w-[540px] text-lg leading-[1.65] text-gray-700 [text-wrap:pretty]">
              Miễn phí. Anh chị không cần biết chỉnh sửa ảnh, không cần biết chạy quảng cáo. Chụp
              một tấm bằng điện thoại, gõ vài chữ, khách ở gần quán mình thấy ngay.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#dangky"
                className="from-accent-dark to-accent text-ink rounded-2xl bg-gradient-to-br px-[26px] py-4 text-base font-bold no-underline shadow-[0_10px_24px_rgba(255,201,60,.3)] transition-transform hover:-translate-y-0.5"
              >
                Đăng ký cho quán mình
              </a>
              <Link
                href="/pricing"
                className="text-background rounded-2xl border-[1.5px] border-white/35 px-[26px] py-4 text-base font-semibold"
              >
                Xem bảng giá
              </Link>
            </div>
            <div className="mt-6 text-[13.5px] text-gray-700">
              Đội ngũ {BRAND} có thể tới quán điền hộ và hướng dẫn đăng bài đầu tiên.
            </div>
          </div>
          <MerchantPhoneMockup />
        </div>
      </section>

      {/* ===== So sánh giá ===== */}
      <section className="mx-auto max-w-[1120px] px-6 py-20">
        <h2 className="text-[34px] font-bold tracking-[-0.02em]">
          Anh chị đang trả tiền cho việc gì?
        </h2>
        <p className="mt-3 max-w-[560px] text-[16.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
          Nhiều group khu vực hiện thu phí đăng bài. Đây là so sánh thẳng, con số lấy theo mức các
          quán hay kể lại với chúng tôi.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-border rounded-[20px] border bg-gray-100 p-[30px]">
            <div className="font-mono text-[11px] tracking-[0.06em] text-gray-800">
              ĐANG TRẢ CHO GROUP KHU VỰC
            </div>
            <div className="mt-3.5 flex items-baseline gap-2">
              <span className="text-[38px] font-bold tracking-[-0.02em]">200.000đ</span>
              <span className="text-[15px] text-gray-800">/ tháng</span>
            </div>
            <div className="mt-5.5 flex flex-col gap-3.5">
              <PriceRow dot="bg-gray-400">
                Trả phí theo bài hoặc theo tháng, quán nào cũng cùng một giá
              </PriceRow>
              <PriceRow dot="bg-gray-400">Bài chìm sau 20 phút vì có người khác đăng lên</PriceRow>
              <PriceRow dot="bg-gray-400">
                Không biết ai đã xem, cũng không biết họ ở gần hay xa
              </PriceRow>
              <PriceRow dot="bg-gray-400">
                Muốn nhiều người thấy thì phải bỏ thêm tiền chạy quảng cáo
              </PriceRow>
            </div>
          </div>
          <div className="border-accent-soft-border-strong rounded-[20px] border-[1.5px] bg-[linear-gradient(165deg,#FFFFFF,#FDF0E2)] p-[30px] shadow-[0_10px_30px_rgba(255,201,60,.14)]">
            <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">
              DÙNG PHỐ MÌNH
            </div>
            <div className="mt-3.5 flex items-baseline gap-2">
              <span className="text-accent-text text-[38px] font-bold tracking-[-0.02em]">0đ</span>
              <span className="text-[15px] text-gray-800">/ {FREE_MONTHS} tháng đầu</span>
            </div>
            <div className="mt-5.5 flex flex-col gap-3.5">
              <PriceRow dot="bg-accent-soft-200">
                Miễn phí hoàn toàn {FREE_MONTHS} tháng đầu, không cần thẻ tín dụng
              </PriceRow>
              <PriceRow dot="bg-accent-soft-200">
                Bài hiện đúng bán kính khách ở gần quán mình nhất
              </PriceRow>
              <PriceRow dot="bg-accent-soft-200">
                Xem được thống kê: bao nhiêu lượt xem, bao nhiêu người lưu bài
              </PriceRow>
              <PriceRow dot="bg-accent-soft-200">
                Bài tự hết hạn sau 24 giờ, không phải nhớ vào xóa
              </PriceRow>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Đăng bài 20 giây ===== */}
      <section className="border-border border-y bg-[linear-gradient(180deg,#FAFBFC,#EDEFF2_40%,#E7EAEE)]">
        <div className="py-19 mx-auto max-w-[1120px] px-6">
          <h2 className="text-[34px] font-bold tracking-[-0.02em]">
            Đăng một bài mất khoảng 20 giây
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="border-border to-background rounded-[20px] border bg-gradient-to-b from-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(32,36,43,.10)]">
              <div className="text-primary-darker font-mono text-[13px] font-semibold">01</div>
              <div className="mt-2.5 text-[19px] font-bold">Chụp ảnh trực tiếp</div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
                Bấm chụp trong app là xong, không cần chỉnh sửa, không cần thêm chữ lên ảnh.
              </p>
              <div className="relative mt-4 flex h-[150px] items-end justify-center rounded-[14px] bg-[repeating-linear-gradient(135deg,#E9ECEF,#E9ECEF_7px,#DCE1E6_7px,#DCE1E6_14px)] pb-3.5">
                <span className="h-12 w-12 rounded-full border-4 border-black/[0.12] bg-white" />
              </div>
            </div>
            <div className="border-border to-background rounded-[20px] border bg-gradient-to-b from-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(32,36,43,.10)]">
              <div className="text-primary-darker font-mono text-[13px] font-semibold">02</div>
              <div className="mt-2.5 text-[19px] font-bold">Gõ vài chữ</div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
                Viết như nói với khách quen. Không cần câu quảng cáo hay hashtag gì cả.
              </p>
              <div className="mt-4 flex h-[150px] flex-col gap-2.5 rounded-[14px] bg-gray-100 p-3.5">
                <div className="text-[15px] font-semibold leading-[1.4]">
                  còn 5 suất bún
                  <span className="animate-pmpulse bg-primary-darker ml-0.5 inline-block h-[17px] w-0.5 align-[-3px]" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-white px-2.5 py-1.5 text-xs text-gray-800">
                    Còn hàng
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1.5 text-xs text-gray-800">
                    Giảm giá
                  </span>
                </div>
              </div>
            </div>
            <div className="border-border to-background rounded-[20px] border bg-gradient-to-b from-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(32,36,43,.10)]">
              <div className="text-primary-darker font-mono text-[13px] font-semibold">03</div>
              <div className="mt-2.5 text-[19px] font-bold">Đăng, rồi quên nó đi</div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
                Sau 24 giờ bài tự hết hạn. Anh chị không phải vào xóa, khách cũng không đọc tin cũ.
              </p>
              <div className="mt-4 flex h-[150px] flex-col items-center justify-center gap-2.5 rounded-[14px] bg-gray-100">
                <span className="text-accent-text font-mono text-[26px] font-semibold">23:52</span>
                <span className="text-[12.5px] text-gray-800">tự ẩn khi hết giờ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Giờ hiện số ===== */}
      <section className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">
            SỐ ĐIỆN THOẠI THEO GIỜ BÁN
          </div>
          <h2 className="mt-3.5 text-[32px] font-bold leading-[1.15] tracking-[-0.02em] [text-wrap:pretty]">
            Khách gọi được lúc quán đang mở, hết giờ thì thôi
          </h2>
          <p className="mt-3.5 text-[16.5px] leading-[1.65] text-gray-800 [text-wrap:pretty]">
            Anh chị đặt khung giờ đang bán. Trong giờ đó, nút gọi Zalo và số điện thoại hiện trên
            bài. Ngoài giờ, số tự ẩn — không ai gọi lúc quán đã đóng, cũng không lo bị làm phiền
            buổi tối.
          </p>
          <div className="mt-5.5 flex flex-col gap-2.5">
            <PhoneNote>Đặt được nhiều khung giờ trong ngày, ví dụ sáng và chiều</PhoneNote>
            <PhoneNote>Đóng quán sớm thì tắt tay một nút, số ẩn ngay</PhoneNote>
            <PhoneNote>Số cá nhân của anh chị không bao giờ hiện nếu không bật</PhoneNote>
          </div>
        </div>
        <div className="border-border p-6.5 rounded-[20px] border bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-bold">Giờ hiện số</div>
              <div className="mt-0.5 text-[13px] text-gray-800">Hôm nay, thứ Năm</div>
            </div>
            <span className="bg-primary-soft-100 text-primary-darker rounded-full px-3 py-1.5 font-mono text-xs font-semibold">
              ĐANG BẬT
            </span>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-3.5">
              <span className="flex-1 font-mono text-[15px] font-semibold">06:00 – 13:30</span>
              <span className="text-[13px] text-gray-800">Buổi sáng</span>
              <span className="bg-success flex h-6 w-[42px] items-center justify-end rounded-full p-0.5">
                <span className="h-5 w-5 rounded-full bg-white" />
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-3.5">
              <span className="flex-1 font-mono text-[15px] font-semibold text-gray-800">
                17:00 – 21:00
              </span>
              <span className="text-[13px] text-gray-800">Buổi chiều</span>
              <span className="flex h-6 w-[42px] items-center rounded-full bg-gray-400 p-0.5">
                <span className="h-5 w-5 rounded-full bg-white" />
              </span>
            </div>
          </div>
          <div className="border-border bg-background mt-4 rounded-2xl border p-3.5 text-[13.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
            Ngoài khung giờ đã bật, bài của quán vẫn hiện nhưng nút gọi chuyển thành “Quán đang
            đóng”.
          </div>
        </div>
      </section>

      {/* ===== Đăng ký ===== */}
      <section
        id="dangky"
        className="text-background relative scroll-mt-20 overflow-hidden bg-[linear-gradient(140deg,#20242B_0%,#2C323C_55%,#20242B_100%)]"
      >
        <div className="py-19 mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold leading-[1.12] tracking-[-0.02em] [text-wrap:pretty]">
              Đăng ký cho quán mình — chỉ ba dòng
            </h2>
            <p className="mt-3.5 max-w-[460px] text-[17px] leading-[1.65] text-gray-700 [text-wrap:pretty]">
              Điền xong, trong vòng một ngày làm việc sẽ có người gọi cho anh chị để mở trang quán
              và hướng dẫn đăng bài đầu tiên.
            </p>
            <div className="mt-6.5 rounded-2xl border border-white/[0.14] bg-white/[0.07] p-5">
              <div className="text-accent text-base font-bold">Cam kết</div>
              <div className="text-background mt-2 text-base leading-[1.6]">
                Miễn phí hoàn toàn {FREE_MONTHS} tháng đầu, không cần thẻ tín dụng. Hết{' '}
                {FREE_MONTHS} tháng, nếu không muốn dùng tiếp thì không phải làm gì cả — không tự
                động thu phí.
              </div>
            </div>
            <div className="mt-5 text-[13.5px] text-gray-700">
              Gặp đội ngũ trực tiếp? Gọi 1900 xxxx hoặc Zalo cùng số.
            </div>
          </div>
          <MerchantRegisterForm />
        </div>
      </section>
    </main>
  );
}

function PriceRow({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className={`h-5 w-5 flex-none rounded-md ${dot}`} />
      <span className="text-[14.5px] leading-[1.55] text-gray-900">{children}</span>
    </div>
  );
}

function PhoneNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="bg-accent-text mt-1.5 h-2 w-2 flex-none rounded-full" />
      <span className="text-[15px] leading-[1.55] text-gray-900">{children}</span>
    </div>
  );
}
