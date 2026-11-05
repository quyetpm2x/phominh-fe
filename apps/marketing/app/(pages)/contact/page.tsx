import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactForm } from '../../../components/ContactForm';
import { FaqItem } from '../../../components/FaqItem';
import { BRAND, CONTACT_EMAILS, CONTACT_PHONE } from '../../../lib/constants';

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
              Không. {BRAND} miễn phí cho mọi người dùng và không có gói trả tiền nào.
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
              Họ thấy tên hiển thị của bạn và khoảng cách đã làm tròn tới bài đăng. Số điện thoại
              không hiển thị công khai; địa chỉ chỉ hiện khi bạn tự nhập vào bài.
            </FaqItem>
            <FaqItem question="Tôi muốn xóa toàn bộ dữ liệu của mình thì làm sao?">
              Trong app: Cài đặt → Đăng xuất & Xoá tài khoản. Tài khoản được xoá vĩnh viễn sau 30
              ngày; trong thời gian này anh chị có thể đăng nhập lại để huỷ. Xem mục “Quyền xóa dữ
              liệu cá nhân” trong{' '}
              <Link href="/legal#qrt3" className="text-accent-text hover:text-[#6E3018]">
                Chính sách quyền riêng tư
              </Link>
              .
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
            <div>Điện thoại: {CONTACT_PHONE}</div>
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
