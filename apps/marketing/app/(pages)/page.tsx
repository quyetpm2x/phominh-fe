import Link from 'next/link';

import { HomeHero } from '../../components/HomeHero';
import { NotifySignup } from '../../components/NotifySignup';

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      {/* ===== Cách cũ / cách mới ===== */}
      <section className="mx-auto max-w-[1120px] px-6 py-[84px]">
        <h2 className="max-w-[640px] text-4xl font-bold leading-[1.15] tracking-[-0.02em] [text-wrap:pretty]">
          Chuyện quanh nhà thì nhiều, chỗ để xem thì lộn xộn
        </h2>
        <p className="mt-3.5 max-w-[600px] text-[17px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
          Group Facebook khu vực vẫn hữu ích, nhưng nó không được làm ra để trả lời câu hỏi “ngay
          bây giờ, quanh đây có gì”.
        </p>
        <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-border rounded-[20px] border bg-gray-100 p-[30px]">
            <div className="font-mono text-[11px] tracking-[0.06em] text-gray-800">CÁCH CŨ</div>
            <div className="mt-2 text-[22px] font-bold">Group khu vực trên mạng xã hội</div>
            <div className="mt-[22px] flex flex-col gap-4">
              <OldWayItem
                title="Phải xin admin duyệt rồi chờ"
                desc="Chuyển sang khu mới là lại xin vào group mới, có khi chờ vài ngày."
              />
              <OldWayItem
                title="Tin cũ tin mới lẫn lộn"
                desc="Bài “còn hàng” của tuần trước vẫn nổi lên vì có người vừa bình luận."
              />
              <OldWayItem
                title="Quảng cáo từ khắp nơi"
                desc="Nhiều bài đến từ người cách bạn 20 km, hoặc chẳng ở đâu gần cả."
              />
            </div>
          </div>
          <div className="border-accent-soft-border-strong rounded-[20px] border-[1.5px] bg-[linear-gradient(165deg,#FFFFFF,#FFF4D3)] p-[30px] shadow-[0_10px_28px_rgba(255,201,60,.16)]">
            <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">CÁCH MỚI</div>
            <div className="mt-2 text-[22px] font-bold">Phố Mình</div>
            <div className="mt-[22px] flex flex-col gap-4">
              <NewWayItem
                title="Mở app là thấy ngay"
                desc="Không đơn xin vào, không kiểm duyệt thành viên. Ở gần là xem được."
              />
              <NewWayItem
                title="Bài cũ tự mờ dần rồi ẩn"
                desc="Viền bài đổi màu theo thời gian, hết 24 giờ là tự ẩn. Không ai phải dọn."
              />
              <NewWayItem
                title="Chỉ người quanh đây"
                desc="Mỗi bài gắn vị trí thật lúc đăng, hiện theo bán kính bạn chọn."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ba bước ===== */}
      <section className="border-border border-y bg-[linear-gradient(180deg,#FAFBFC,#EDEFF2_40%,#E7EAEE)]">
        <div className="mx-auto max-w-[1120px] px-6 py-20">
          <h2 className="text-4xl font-bold tracking-[-0.02em]">Ba bước, xong trong một phút</h2>
          <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
            <StepCard step="01">
              <div className="mt-3 text-xl font-bold">Mở app, xác thực số điện thoại</div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
                Một mã 6 số là xong. Không cần email, không cần tên thật. Một số điện thoại chỉ tạo
                được một tài khoản.
              </p>
              <div className="mt-4.5 flex gap-2">
                {['4', '9', '2'].map((d) => (
                  <span
                    key={d}
                    className="flex h-[46px] w-[38px] items-center justify-center rounded-[9px] bg-gray-100 font-mono text-lg font-semibold"
                  >
                    {d}
                  </span>
                ))}
                <span className="border-gray-450 h-[46px] w-[38px] rounded-[9px] border-[1.5px] border-dashed bg-white" />
              </div>
            </StepCard>
            <StepCard step="02">
              <div className="mt-3 text-xl font-bold">Thấy ngay feed quanh mình</div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
                Khoảng cách hiện theo kiểu dễ hình dung — “~5 phút đi bộ” thay vì con số km khô
                khan.
              </p>
              <div className="mt-4.5 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 rounded-[11px] bg-gray-100 px-3 py-2.5">
                  <span className="bg-success h-2 w-2 rounded-full" />
                  <span className="flex-1 text-[13.5px]">Cà phê ngõ 45</span>
                  <span className="font-mono text-xs text-gray-800">~3 phút đi bộ</span>
                </div>
                <div className="flex items-center gap-2.5 rounded-[11px] bg-gray-100 px-3 py-2.5">
                  <span className="bg-accent-dark h-2 w-2 rounded-full" />
                  <span className="flex-1 text-[13.5px]">Chợ Vĩnh Tuy</span>
                  <span className="font-mono text-xs text-gray-800">~11 phút đi bộ</span>
                </div>
              </div>
            </StepCard>
            <StepCard step="03">
              <div className="mt-3 text-xl font-bold">Bình luận, vote, hoặc tự đăng</div>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
                Bài hữu ích được hàng xóm vote uy tín. Có gì muốn chia sẻ thì chụp một tấm rồi đăng.
              </p>
              <div className="mt-4.5 flex items-center gap-2">
                <span className="bg-accent-soft-100 text-accent-text rounded-full px-3.5 py-2.5 text-[13px] font-semibold">
                  Hữu ích · 42
                </span>
                <span className="rounded-full bg-gray-100 px-3.5 py-2.5 text-[13px] font-semibold text-gray-800">
                  Bình luận
                </span>
              </div>
            </StepCard>
          </div>
        </div>
      </section>

      {/* ===== Tin cậy ===== */}
      <section className="mx-auto max-w-[1120px] px-6 py-[84px]">
        <h2 className="max-w-[600px] text-4xl font-bold tracking-[-0.02em] [text-wrap:pretty]">
          Để hàng xóm tin nhau, app phải làm vài việc cẩn thận
        </h2>
        <div className="mt-8.5 gap-4.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <TrustCard dot="bg-accent-soft-100" title="Ảnh chụp trực tiếp trong app">
            Không tải ảnh cũ từ thư viện, nên bài “còn hàng” đúng là của hôm nay.
          </TrustCard>
          <TrustCard dot="bg-accent-soft-100" title="Điểm uy tín tích lũy dần">
            Người hay đăng tin hữu ích được hàng xóm vote, uy tín lên theo thời gian.
          </TrustCard>
          <TrustCard dot="bg-accent-soft-200" title="Tin khẩn cấp được xác minh">
            Cần nhiều nguồn ở gần cùng xác nhận trước khi tin lan ra cả khu.
          </TrustCard>
          <TrustCard dot="bg-gray-250" title="Vị trí chỉ lấy khi mở app">
            Không theo dõi chạy nền. Bạn xóa dữ liệu cá nhân bất cứ lúc nào.{' '}
            <Link href="/legal#qrt2" className="text-accent-text hover:text-[#6E3018]">
              Xem chính sách
            </Link>
          </TrustCard>
        </div>
      </section>

      {/* ===== Đang chạy thí điểm ===== */}
      <section className="border-border border-t bg-[linear-gradient(180deg,#EDEFF2,#EBEEF1)]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-[34px] font-bold tracking-[-0.02em]">Đang chạy thí điểm ở đâu</h2>
            <p className="mt-3.5 max-w-[460px] text-[16.5px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
              Giai đoạn đầu tập trung vào vài khu đông dân, để mỗi lần mở app là có tin thật để đọc.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="border-primary-soft-border flex items-center gap-3 rounded-2xl border-[1.5px] bg-white px-4 py-3.5">
                <span className="bg-success h-2.5 w-2.5 rounded-full" />
                <span className="flex-1 text-[15px] font-semibold">
                  Times City &amp; Vĩnh Tuy, Hà Nội
                </span>
                <span className="text-primary-darker font-mono text-xs font-medium">ĐANG CHẠY</span>
              </div>
              <div className="border-border flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5">
                <span className="bg-accent-dark h-2.5 w-2.5 rounded-full" />
                <span className="flex-1 text-[15px] font-semibold">
                  Thảo Điền &amp; Bình Thạnh, TP.HCM
                </span>
                <span className="text-accent-text font-mono text-xs font-medium">THÁNG SAU</span>
              </div>
            </div>
            <div className="border-gray-450 mt-5 rounded-2xl border border-dashed bg-white p-5">
              <div className="text-base font-bold">Sắp có mặt tại khu vực của bạn</div>
              <p className="mt-1.5 text-sm leading-[1.6] text-gray-800">
                Để lại số điện thoại, mở khu mới là chúng tôi nhắn bạn trước.
              </p>
              <NotifySignup />
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-[20px] border border-gray-400 bg-gray-200">
            <div className="absolute inset-0 bg-[linear-gradient(#D4DAE0_1px,transparent_1px),linear-gradient(90deg,#D4DAE0_1px,transparent_1px)] bg-[length:48px_48px]" />
            <div className="absolute -left-[60px] top-[150px] h-[52px] w-[700px] -rotate-[9deg] bg-[#D8DDE3]" />
            <div className="absolute -top-[60px] left-[200px] h-[560px] w-11 rotate-[8deg] bg-[#D8DDE3]" />
            <div className="absolute left-[44%] top-[42%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[rgba(31,111,82,.45)] bg-[rgba(31,111,82,.13)]" />
            <div className="bg-accent-text absolute left-[44%] top-[42%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,.25)]" />
            <div className="text-accent-text absolute left-[44%] top-[42%] -translate-x-1/2 translate-y-[68px] font-mono text-[11px] font-medium">
              KHU THÍ ĐIỂM
            </div>
            <div className="bg-accent-dark absolute bottom-[70px] right-[52px] h-[11px] w-[11px] rounded-full border-[3px] border-white" />
            <div className="absolute bottom-4 left-4 font-mono text-[10.5px] font-medium text-gray-800">
              SƠ ĐỒ MINH HOẠ — CHỜ BẢN ĐỒ THẬT
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function OldWayItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span className="h-[22px] w-[22px] flex-none rounded-[7px] bg-gray-400" />
      <div>
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="mt-0.5 text-[13.5px] leading-[1.55] text-gray-800">{desc}</div>
      </div>
    </div>
  );
}

function NewWayItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span className="bg-accent-soft-100 h-[22px] w-[22px] flex-none rounded-[7px]" />
      <div>
        <div className="text-[15px] font-semibold">{title}</div>
        <div className="mt-0.5 text-[13.5px] leading-[1.55] text-gray-800">{desc}</div>
      </div>
    </div>
  );
}

function StepCard({ step, children }: { step: string; children: React.ReactNode }) {
  return (
    <div className="border-border to-background rounded-[20px] border bg-gradient-to-b from-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(32,36,43,.10)]">
      <div className="text-primary-darker font-mono text-[13px] font-semibold">{step}</div>
      {children}
    </div>
  );
}

function TrustCard({
  dot,
  title,
  children,
}: {
  dot: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border to-background rounded-[18px] border bg-gradient-to-b from-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(32,36,43,.10)]">
      <span className={`block h-8 w-8 rounded-[10px] ${dot}`} />
      <div className="mt-4 text-[16.5px] font-bold">{title}</div>
      <p className="mt-2 text-sm leading-[1.6] text-gray-800 [text-wrap:pretty]">{children}</p>
    </div>
  );
}
