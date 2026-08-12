import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactForm } from '../../../components/ContactForm';
import { FaqItem } from '../../../components/FaqItem';
import { BRAND, CONTACT_EMAILS, CONTACT_PHONE, FREE_MONTHS } from '../../../lib/constants';

export const metadata: Metadata = {
  title: 'Liên hệ & FAQ',
  description: 'Câu hỏi thường gặp, và chỗ để hỏi tiếp.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-[90px] pt-16">
      <h1 className="max-w-[620px] text-[44px] font-bold leading-[1.1] tracking-[-0.025em] [text-wrap:pretty]">
        Câu hỏi thường gặp, và chỗ để hỏi tiếp
      </h1>

      <div className="gap-13 mt-11 grid grid-cols-1 items-start lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">
            CÂU HỎI CHO CƯ DÂN
          </div>
          <div className="mt-3.5 flex flex-col gap-2.5">
            <FaqItem question="App có thu phí không?">
              Không. Với cư dân, {BRAND} miễn phí và không có gói trả tiền nào. Doanh thu trong
              tương lai đến từ gói đăng bài của cơ sở kinh doanh, không từ người xem.
            </FaqItem>
            <FaqItem question="Vị trí của tôi có bị theo dõi không?">
              Không. Vị trí chỉ được lấy khi bạn đang mở app, không có theo dõi chạy nền và chúng
              tôi không lưu lịch sử di chuyển. Chi tiết đầy đủ ở mục “Dữ liệu vị trí GPS” trong{' '}
              <Link href="/legal#qrt2" className="text-accent-text hover:text-[#6E3018]">
                Chính sách quyền riêng tư
              </Link>
              .
            </FaqItem>
            <FaqItem question="Hàng xóm có biết tôi là ai không?">
              Họ chỉ thấy tên bạn tự đặt và khoảng cách tương đối tới bài đăng. Số điện thoại không
              hiển thị công khai, địa chỉ nhà cũng không.
            </FaqItem>
            <FaqItem question="Tôi muốn xóa toàn bộ dữ liệu của mình thì làm sao?">
              Trong app: Cài đặt → Dữ liệu của tôi → Xóa tài khoản và dữ liệu. Xử lý trong 72 giờ.
              Xem mục “Quyền xóa dữ liệu cá nhân” trong{' '}
              <Link href="/legal#qrt3" className="text-accent-text hover:text-[#6E3018]">
                Chính sách quyền riêng tư
              </Link>
              .
            </FaqItem>
          </div>

          <div className="text-accent-text mt-9 font-mono text-[11px] tracking-[0.06em]">
            CÂU HỎI CHO TIỂU THƯƠNG
          </div>
          <div className="mt-3.5 flex flex-col gap-2.5">
            <FaqItem question="Đăng ký mất bao lâu?">
              Điền ba dòng mất khoảng một phút. Trong vòng một ngày làm việc sẽ có người gọi để mở
              trang quán cho anh chị. Nếu đang gặp nhân viên tại quán, họ điền hộ và mở luôn tại
              chỗ.
            </FaqItem>
            <FaqItem question="Tôi có cần biết chỉnh ảnh không?">
              Không cần. Anh chị bấm chụp trong app rồi gõ vài chữ là đăng được. Thực tế ảnh chụp
              mộc lại được khách tin hơn ảnh chỉnh nhiều.
            </FaqItem>
            <FaqItem question={`Hết ${FREE_MONTHS} tháng miễn phí thì sao?`}>
              Hiện chúng tôi chưa thu phí của quán nào. Khi bắt đầu thu, sẽ báo trước ít nhất 30
              ngày. Không tự động trừ tiền, vì đăng ký không cần thẻ. Xem{' '}
              <Link href="/pricing" className="text-accent-text hover:text-[#6E3018]">
                Bảng giá
              </Link>
              .
            </FaqItem>
            <FaqItem question="Khách gọi lúc quán đóng thì sao?">
              Anh chị đặt khung giờ bán. Ngoài giờ đó, số điện thoại và nút gọi Zalo tự ẩn, bài chỉ
              hiện “Quán đang đóng”.
            </FaqItem>
          </div>
        </div>

        <div className="border-border top-[92px] rounded-[20px] border bg-white p-7 lg:sticky">
          <div className="text-[22px] font-bold">Gửi câu hỏi</div>
          <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
            Chúng tôi trả lời trong giờ hành chính, thường trong cùng ngày.
          </p>
          <ContactForm />
          <div className="mt-4.5 border-border pt-4.5 flex flex-col gap-2 border-t text-sm text-gray-800">
            <div>
              Hỗ trợ chung:{' '}
              <a
                href={`mailto:${CONTACT_EMAILS.support}`}
                className="text-accent-text hover:text-[#6E3018]"
              >
                {CONTACT_EMAILS.support}
              </a>
            </div>
            <div>
              Đăng ký đối tác:{' '}
              <a
                href={`mailto:${CONTACT_EMAILS.merchant}`}
                className="text-accent-text hover:text-[#6E3018]"
              >
                {CONTACT_EMAILS.merchant}
              </a>{' '}
              · {CONTACT_PHONE}
            </div>
            <div>
              Về dữ liệu cá nhân:{' '}
              <a
                href={`mailto:${CONTACT_EMAILS.data}`}
                className="text-accent-text hover:text-[#6E3018]"
              >
                {CONTACT_EMAILS.data}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
