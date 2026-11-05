import type { Metadata } from 'next';
import Link from 'next/link';

import { BRAND } from '../../../lib/constants';

export const metadata: Metadata = {
  title: 'Về chúng tôi',
  description: `Vì sao ${BRAND} tồn tại, và 5 điều chúng tôi giữ nguyên tắc khi xây nó.`,
};

const VALUES = [
  {
    title: 'Hàng xóm thật, không phải người lạ toàn cầu',
    body: 'Bán kính feed cố định 5 km, có chủ đích. Mở rộng ra xa hơn là đánh đổi đúng thứ khiến hàng xóm tin nhau ngay từ đầu — chúng tôi chọn không đánh đổi.',
  },
  {
    title: 'Ảnh chụp tại chỗ có nhãn riêng',
    body: 'Bạn có thể chọn ảnh từ thư viện, nhưng chỉ bài có mọi ảnh chụp tại chỗ mới được gắn nhãn Chụp trực tiếp, nên hàng xóm dễ biết tin nào vừa xảy ra.',
  },
  {
    title: 'Tin ngắn hạn có thể tự ẩn',
    body: 'Khi đăng, tác giả có thể bật tự ẩn sau 48 giờ cho những tin chỉ đúng trong lúc này. Mặc định bài vẫn hiển thị cho tới khi tác giả xoá.',
  },
  {
    title: 'Uy tín do hàng xóm quyết định, không phải chúng tôi',
    body: 'Điểm uy tín là số người đang tin tưởng bạn và họ rút lại được bất cứ lúc nào. Chúng tôi không đứng ra phán xét ai đáng tin — cộng đồng tự làm việc đó.',
  },
  {
    title: 'Vị trí chỉ dùng lúc cần, không theo dõi',
    body: 'GPS chỉ được lấy khi anh chị đang mở app, không chạy nền, không lưu lịch sử di chuyển. Từ chối quyền vị trí vẫn dùng được app bình thường.',
  },
] as const;

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 pb-[90px] pt-16">
      <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">VỀ CHÚNG TÔI</div>
      <h1 className="mt-3.5 text-[44px] font-bold leading-[1.12] tracking-[-0.025em] [text-wrap:pretty]">
        Chuyện quanh nhà, đúng cho người ở quanh đó
      </h1>
      <p className="mt-4.5 max-w-[620px] text-[18px] leading-[1.65] text-gray-800 [text-wrap:pretty]">
        {BRAND} không cố làm một mạng xã hội lớn hơn những gì đã có. Chúng tôi chỉ muốn một nơi nhỏ,
        đúng bán kính 5 km, để mở lên là biết ngay chuyện quanh mình — không phải chuyện ở đâu đó
        xa.
      </p>

      {/* ===== Sứ mệnh ===== */}
      <section className="border-accent-soft-border-strong mt-11 rounded-[20px] border-[1.5px] bg-[linear-gradient(165deg,#FFFFFF,#FFF4D3)] p-8">
        <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">SỨ MỆNH</div>
        <p className="mt-3 text-[22px] font-bold leading-[1.4] tracking-[-0.01em] [text-wrap:pretty]">
          Giúp mọi khu dân cư có một nơi đáng tin để biết chuyện đang xảy ra ngay quanh mình — không
          lộn xộn, không lẫn tin cũ tin mới, không phải xin phép ai để được xem.
        </p>
      </section>

      {/* ===== Câu chuyện khởi nguồn ===== */}
      <section className="mt-14">
        <h2 className="text-[26px] font-bold tracking-[-0.02em]">Câu chuyện khởi nguồn</h2>
        <div className="mt-4 flex flex-col gap-4 text-[17px] leading-[1.75] text-gray-900 [text-wrap:pretty]">
          <p>
            Mọi chuyện bắt đầu từ một quan sát rất đơn giản: group Facebook của khu vẫn còn hữu ích,
            nhưng nó không được làm ra để trả lời đúng câu hỏi &ldquo;ngay bây giờ, quanh đây có
            gì&rdquo;. Muốn vào group mới thì phải xin admin duyệt. Bài &ldquo;còn hàng&rdquo; của
            tuần trước vẫn nổi lên đầu vì có người vừa bình luận. Và không ít bài đến từ người cách
            vài chục cây số, chẳng liên quan gì tới khu mình đang ở.
          </p>
          <p>
            Chúng tôi không nghĩ giải pháp là làm một mạng xã hội lớn hơn, nhiều tính năng hơn. Càng
            nghĩ kỹ càng thấy vấn đề nằm ở chỗ khác: một nơi có ích cho &ldquo;chuyện quanh
            nhà&rdquo; phải nhỏ lại, đúng bán kính 5 km, để chuyện ở xa không chen vào.
          </p>
          <p>
            Vì vậy, thay vì mở cùng lúc nhiều nơi, chúng tôi chọn bắt đầu ở đúng một khu — Times
            City và Vĩnh Tuy, Hà Nội — nơi đủ đông để feed lúc nào cũng có tin thật, và đủ nhỏ để
            mỗi bài đăng vẫn còn ý nghĩa &ldquo;quanh đây&rdquo; theo đúng nghĩa đen. Khu tiếp theo
            chỉ mở khi khu đầu tiên đã chứng minh được người ở đó thật sự quay lại dùng, chứ không
            phải tải về rồi bỏ.
          </p>
        </div>
      </section>

      {/* ===== 5 giá trị cốt lõi ===== */}
      <section className="mt-14">
        <h2 className="text-[26px] font-bold tracking-[-0.02em]">5 giá trị cốt lõi</h2>
        <p className="mt-2.5 max-w-[560px] text-[15px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
          Đây không phải khẩu hiệu treo tường — đây là những lựa chọn kỹ thuật cụ thể chúng tôi giữ
          nguyên tắc, kể cả khi nó khiến việc tăng trưởng chậm hơn.
        </p>
        <div className="mt-6 flex flex-col gap-3.5">
          {VALUES.map((value, i) => (
            <ValueRow key={value.title} index={i + 1} title={value.title} body={value.body} />
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mt-14 flex flex-wrap gap-3 border-t border-gray-300 pt-9">
        <Link
          href="/contact"
          className="border-gray-450 text-foreground rounded-2xl border-[1.5px] px-[26px] py-4 text-base font-semibold no-underline"
        >
          Có câu hỏi khác? Liên hệ
        </Link>
      </section>
    </main>
  );
}

function ValueRow({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="border-border to-background gap-4.5 flex rounded-[18px] border bg-gradient-to-b from-white p-5">
      <span className="text-accent-text font-mono text-[13px] font-semibold">
        {String(index).padStart(2, '0')}
      </span>
      <div>
        <div className="text-ink text-[16.5px] font-bold">{title}</div>
        <p className="mt-1.5 text-sm leading-[1.65] text-gray-800 [text-wrap:pretty]">{body}</p>
      </div>
    </div>
  );
}
