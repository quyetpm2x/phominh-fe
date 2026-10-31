import type { Metadata } from 'next';
import Link from 'next/link';

import { PrintButton } from '../../../components/PrintButton';
import { BRAND, CONTACT_EMAILS, CONTACT_PHONE } from '../../../lib/constants';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng & Chính sách quyền riêng tư',
};

const TOC = [
  { href: '#dk', label: 'Điều khoản sử dụng', top: true },
  { href: '#dk1', label: '1. Ai được dùng app' },
  { href: '#dk2', label: '2. Tài khoản và số điện thoại' },
  { href: '#dk3', label: '3. Nội dung anh chị đăng' },
  { href: '#dk4', label: '4. Nội dung bị cấm' },
  { href: '#dk5', label: '5. Tạm ngưng tài khoản' },
  { href: '#qrt', label: 'Chính sách quyền riêng tư', top: true },
  { href: '#qrt1', label: '1. Dữ liệu chúng tôi thu thập' },
  { href: '#qrt2', label: '2. Dữ liệu vị trí GPS' },
  { href: '#qrt3', label: '3. Quyền xóa dữ liệu cá nhân' },
  { href: '#qrt4', label: '4. Chia sẻ với bên thứ ba' },
  { href: '#qrt5', label: '5. Thời gian lưu trữ' },
  { href: '#qrt6', label: '6. Liên hệ về dữ liệu' },
] as const;

export default function LegalPage() {
  return (
    <main className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-14 px-6 pb-[90px] pt-14 lg:grid-cols-[250px_1fr]">
      <aside className="top-[92px] flex flex-col gap-1.5 lg:sticky">
        <div className="mb-1.5 font-mono text-[11px] tracking-[0.06em] text-gray-800">MỤC LỤC</div>
        {TOC.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={
              'top' in item && item.top
                ? 'text-foreground mt-2.5 rounded-lg px-2.5 py-1.5 text-[14.5px] font-semibold no-underline first:mt-0'
                : 'pl-5.5 rounded-lg py-1.5 pr-2.5 text-sm text-gray-800 no-underline'
            }
          >
            {item.label}
          </a>
        ))}
        <PrintButton className="mt-4.5 border-gray-450 text-foreground h-[46px] rounded-xl border-[1.5px] bg-white text-[14.5px] font-semibold" />
      </aside>

      <article className="max-w-[680px]">
        <h1
          id="dk"
          className="scroll-mt-25 text-[38px] font-bold leading-[1.12] tracking-[-0.02em]"
        >
          Điều khoản sử dụng
        </h1>
        <div className="mt-2.5 font-mono text-[13px] text-gray-800">
          Cập nhật 01/08/2026 · Áp dụng cho toàn bộ người dùng {BRAND}
        </div>

        <LegalHeading id="dk1" className="mt-10">
          1. Ai được dùng app
        </LegalHeading>
        <LegalP>
          {BRAND} dành cho người từ 16 tuổi trở lên, đang sinh sống hoặc làm việc tại khu vực app
          đang hoạt động. Khi tạo tài khoản, anh chị xác nhận mình đủ tuổi và thông tin cung cấp là
          của mình.
        </LegalP>

        <LegalHeading id="dk2">2. Tài khoản và số điện thoại</LegalHeading>
        <LegalP>
          Mỗi số điện thoại tạo được một tài khoản. Chúng tôi không yêu cầu email hay tên thật. Số
          điện thoại dùng để xác thực và không hiển thị công khai.
        </LegalP>

        <LegalHeading id="dk3">3. Nội dung anh chị đăng</LegalHeading>
        <LegalP>
          Bài đăng vẫn thuộc về anh chị. Khi đăng, anh chị cho phép {BRAND} hiển thị bài đó cho
          người dùng trong bán kính liên quan trong thời gian bài còn hiệu lực. Ảnh phải được chụp
          trực tiếp trong app. Mỗi bài tự hết hiệu lực sau 24 giờ và không còn hiển thị trong feed.
        </LegalP>

        <LegalHeading id="dk4">4. Nội dung bị cấm</LegalHeading>
        <LegalP>
          Không đăng nội dung vi phạm pháp luật Việt Nam, thông tin sai sự thật về an ninh khu vực,
          nội dung xúc phạm cá nhân hoặc nhóm người, hàng hóa bị cấm, dịch vụ tài chính không phép,
          và nội dung người lớn. Không đăng ảnh người khác khi họ không đồng ý, đặc biệt là trẻ em.
        </LegalP>

        <LegalHeading id="dk5">5. Tạm ngưng tài khoản</LegalHeading>
        <LegalP>
          Tài khoản bị nhiều hàng xóm báo cáo về cùng một hành vi sẽ được xem xét và có thể bị tạm
          ngưng. Anh chị được thông báo lý do và có quyền phản hồi. Anh chị cũng có thể tự xóa tài
          khoản bất cứ lúc nào trong phần Cài đặt.
        </LegalP>

        <div className="border-border mt-14 border-t pt-11">
          <h1
            id="qrt"
            className="scroll-mt-25 text-[38px] font-bold leading-[1.12] tracking-[-0.02em]"
          >
            Chính sách quyền riêng tư
          </h1>
          <div className="mt-2.5 font-mono text-[13px] text-gray-800">
            Cập nhật 01/08/2026 · Theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân
          </div>
        </div>

        <LegalHeading id="qrt1">1. Dữ liệu chúng tôi thu thập</LegalHeading>
        <LegalP>
          Số điện thoại (để xác thực tài khoản), tên hiển thị anh chị tự đặt, ảnh và nội dung bài
          đăng, vị trí tại thời điểm đăng bài, và dữ liệu sử dụng cơ bản như lần mở app gần nhất.
          Chúng tôi không thu thập danh bạ, không thu thập lịch sử trình duyệt, không đọc tin nhắn.
        </LegalP>

        <div
          id="qrt2"
          className="mt-8.5 scroll-mt-25 border-accent-soft-border-strong p-6.5 rounded-[18px] border bg-[linear-gradient(160deg,#FFF4D3,#FFEDBE)]"
        >
          <h2 className="text-foreground text-[23px] font-bold">2. Dữ liệu vị trí GPS</h2>
          <p className="mt-3 text-[17px] leading-[1.75] text-[#4A1F0F] [text-wrap:pretty]">
            Vị trí thời gian thực là dữ liệu cá nhân nhạy cảm theo Nghị định 13/2023. Vì vậy chúng
            tôi xử lý như sau:
          </p>
          <div className="mt-4 flex flex-col gap-3.5">
            <GpsPoint>
              Vị trí <b>chỉ được lấy khi anh chị đang mở app</b>. Không có theo dõi chạy nền, kể cả
              khi app còn trong danh sách ứng dụng gần đây.
            </GpsPoint>
            <GpsPoint>
              Chúng tôi không lưu lịch sử di chuyển. Vị trí dùng để tính bán kính feed rồi bỏ, chỉ
              giữ lại vị trí gắn với bài anh chị đã đăng.
            </GpsPoint>
            <GpsPoint>
              Hàng xóm chỉ thấy khoảng cách tương đối tới bài đăng (ví dụ “~5 phút đi bộ”), không
              thấy toạ độ hay địa chỉ nhà anh chị.
            </GpsPoint>
            <GpsPoint>
              Từ chối quyền vị trí vẫn dùng được app: anh chị tự chọn khu vực bằng tay.
            </GpsPoint>
          </div>
        </div>

        <LegalHeading id="qrt3">3. Quyền xóa dữ liệu cá nhân</LegalHeading>
        <LegalP>
          Anh chị có quyền yêu cầu xem, sửa, hoặc xóa toàn bộ dữ liệu cá nhân của mình. Trong app:
          Cài đặt → Dữ liệu của tôi → Xóa tài khoản và dữ liệu. Yêu cầu được xử lý trong vòng 72
          giờ. Sau khi xóa, số điện thoại, tên hiển thị, ảnh và bài đăng của anh chị được xóa khỏi
          hệ thống; bản sao lưu kỹ thuật được xóa trong vòng 30 ngày.
        </LegalP>
        <LegalP>
          Anh chị cũng có thể yêu cầu qua email{' '}
          <a
            href={`mailto:${CONTACT_EMAILS.data}`}
            className="text-accent-text hover:text-[#6E3018]"
          >
            {CONTACT_EMAILS.data}
          </a>{' '}
          kèm số điện thoại tài khoản. Chúng tôi sẽ xác thực bằng mã gửi tới số đó trước khi xử lý.
        </LegalP>

        <LegalHeading id="qrt4">4. Chia sẻ với bên thứ ba</LegalHeading>
        <LegalP>
          Chúng tôi không bán dữ liệu cá nhân. Dữ liệu chỉ được chia sẻ với nhà cung cấp hạ tầng lưu
          trữ và dịch vụ gửi tin nhắn xác thực, trong phạm vi cần thiết để app hoạt động, hoặc khi
          có yêu cầu hợp pháp từ cơ quan nhà nước có thẩm quyền.
        </LegalP>

        <LegalHeading id="qrt5">5. Thời gian lưu trữ</LegalHeading>
        <LegalP>
          Bài đăng hết hiệu lực sau 24 giờ và bị xóa khỏi hệ thống sau 30 ngày. Dữ liệu tài khoản
          được lưu trong thời gian tài khoản còn hoạt động. Tài khoản không đăng nhập 24 tháng liên
          tục sẽ được thông báo trước khi xóa.
        </LegalP>

        <LegalHeading id="qrt6">6. Liên hệ về dữ liệu</LegalHeading>
        <LegalP>
          Mọi thắc mắc hoặc khiếu nại về dữ liệu cá nhân, anh chị liên hệ bộ phận bảo vệ dữ liệu qua{' '}
          <a
            href={`mailto:${CONTACT_EMAILS.data}`}
            className="text-accent-text hover:text-[#6E3018]"
          >
            {CONTACT_EMAILS.data}
          </a>{' '}
          hoặc số {CONTACT_PHONE}. Chúng tôi phản hồi trong vòng 5 ngày làm việc.
        </LegalP>

        <div className="mt-11 flex flex-wrap gap-3">
          <PrintButton className="bg-ink h-[50px] rounded-[13px] px-[22px] text-[15px] font-semibold text-white" />
          <Link
            href="/contact"
            className="border-gray-450 text-foreground flex h-[50px] items-center rounded-[13px] border-[1.5px] px-[22px] text-[15px] font-semibold no-underline"
          >
            Còn câu hỏi? Liên hệ
          </Link>
        </div>
      </article>
    </main>
  );
}

function LegalHeading({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id} className={`scroll-mt-25 text-[23px] font-bold ${className ?? 'mt-8.5'}`}>
      {children}
    </h2>
  );
}

function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[17px] leading-[1.75] text-gray-900 [text-wrap:pretty]">{children}</p>
  );
}

function GpsPoint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="bg-accent-text mt-2 h-2 w-2 flex-none rounded-full" />
      <span className="text-[16.5px] leading-[1.7] text-[#4A1F0F]">{children}</span>
    </div>
  );
}
