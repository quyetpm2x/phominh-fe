export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(155deg,#FAFBFC_0%,#E9F0FC_40%,#FFF1CE_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(#DFE3E8_1px,transparent_1px),linear-gradient(90deg,#DFE3E8_1px,transparent_1px)] bg-[length:64px_64px] opacity-90" />
      <div className="absolute -left-20 top-[180px] h-[74px] w-[900px] -rotate-[7deg] bg-gray-300" />
      <div className="absolute -top-[120px] right-[120px] h-[900px] w-16 rotate-[11deg] bg-gray-300" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,251,252,.62),rgba(250,251,252,.86))] backdrop-blur-[2.5px]" />
      <div className="animate-pmfloat absolute -left-[140px] -top-[120px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(45,108,223,.18),rgba(45,108,223,0)_70%)]" />
      <div className="animate-pmfloat absolute -bottom-[160px] -right-[120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(45,108,223,.22),rgba(45,108,223,0)_70%)] [animation-direction:reverse] [animation-duration:14s]" />
      <div className="animate-pmring border-success/50 absolute left-[2%] top-[3%] h-[60px] w-[60px] rounded-full border-2" />
      <div className="bg-success absolute left-[2%] top-[3%] h-3.5 w-3.5 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,.18)]" />
      <div className="bg-accent-dark absolute bottom-[7%] left-[6%] h-3 w-3 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,.18)]" />
      <div className="bg-accent absolute right-[4%] top-[12%] h-3 w-3 rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,.18)]" />
      <div className="absolute bottom-[9%] right-[6%] h-2.5 w-2.5 rounded-full border-[3px] border-white bg-gray-500" />

      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-6 py-16 pb-[72px] lg:grid-cols-[minmax(0,1.06fr)_minmax(360px,.94fr)]">
        <div>
          <div className="animate-pmup border-accent-soft-border text-accent-text inline-flex items-center gap-2 rounded-full border bg-[linear-gradient(100deg,#FFF4D3,#FFEDBE)] px-3.5 py-1.5 text-[12.5px] font-semibold">
            <span className="animate-pmpulse bg-success h-1.5 w-1.5 flex-none rounded-full" />
            <span className="whitespace-nowrap">Mạng xã hội của khu mình đang ở</span>
          </div>
          <h1 className="mt-4.5 animate-pmup text-foreground text-[clamp(40px,4.6vw,58px)] font-bold leading-[1.05] tracking-[-0.03em] [animation-delay:0.08s] [text-wrap:balance]">
            Mở app lên là biết ngay
            <br />
            <span className="text-primary-darker bg-[linear-gradient(90deg,rgba(255,201,60,.85),rgba(255,201,60,.32))] bg-[length:100%_12px] bg-[position:0_88%] bg-no-repeat px-0.5 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
              chuyện quanh mình
            </span>
          </h1>
          <p className="animate-pmup mt-5 max-w-[520px] text-[18.5px] leading-[1.6] text-gray-800 [animation-delay:0.16s] [text-wrap:pretty]">
            Không cần tìm kiếm, không cần xin vào group nào cả. Bài đăng của người ở cách bạn vài
            phút đi bộ hiện lên ngay khi mở app — tin mới nổi lên trước, tin cũ tự mờ dần rồi ẩn.
          </p>
          <div className="animate-pmup mt-[30px] flex flex-wrap gap-3 [animation-delay:0.24s]">
            <a
              href="#tai-app"
              className="from-primary relative overflow-hidden rounded-2xl bg-gradient-to-br to-[#1A4794] px-[26px] py-4 text-base font-bold text-white no-underline shadow-[0_10px_24px_rgba(255,201,60,.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,201,60,.36)]"
            >
              Tải app — dành cho cư dân
              <span className="animate-pmsweep absolute inset-y-0 left-0 w-10 bg-[linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.55),rgba(255,255,255,0))]" />
            </a>
          </div>
          <div className="animate-pmup mt-7 flex flex-wrap gap-2.5 [animation-delay:0.32s]">
            <span className="border-border flex items-center gap-2 rounded-full border bg-white/75 px-3.5 py-2 text-[13px] font-medium text-gray-900">
              <span className="bg-primary h-1.5 w-1.5 flex-none rounded-full" />
              Xác thực bằng số điện thoại
            </span>
            <span className="border-border flex items-center gap-2 rounded-full border bg-white/75 px-3.5 py-2 text-[13px] font-medium text-gray-900">
              <span className="bg-accent h-1.5 w-1.5 flex-none rounded-full" />
              Không cần email, không cần tên thật
            </span>
            <span className="border-border flex items-center gap-2 rounded-full border bg-white/75 px-3.5 py-2 text-[13px] font-medium text-gray-900">
              <span className="bg-success h-1.5 w-1.5 flex-none rounded-full" />
              Vị trí chỉ lấy khi mở app
            </span>
          </div>
          <div className="animate-pmup mt-8 flex flex-wrap gap-7 border-t border-black/10 pt-[26px] [animation-delay:0.4s]">
            <div>
              <div className="text-primary-darker font-mono text-2xl font-bold tracking-[-0.02em]">
                1.240
              </div>
              <div className="mt-0.5 text-[13px] text-gray-800">hàng xóm quanh Times City</div>
            </div>
            <div>
              <div className="text-accent-text font-mono text-2xl font-bold tracking-[-0.02em]">
                41
              </div>
              <div className="mt-0.5 text-[13px] text-gray-800">tin mới hôm nay</div>
            </div>
            <div>
              <div className="text-foreground font-mono text-2xl font-bold tracking-[-0.02em]">
                5 km
              </div>
              <div className="mt-0.5 text-[13px] text-gray-800">quanh bạn</div>
            </div>
          </div>
        </div>

        <HeroPhoneMockup />
      </div>
    </section>
  );
}

function HeroPhoneMockup() {
  return (
    <div className="gap-4.5 relative flex flex-col items-center">
      <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,108,223,.16),rgba(45,108,223,0)_70%)]" />
      <div className="animate-pmup absolute left-1/2 top-[118px] z-[2] ml-[-268px] flex -rotate-[5deg] items-center gap-2 rounded-full border border-[#C9E2CE] bg-white px-3.5 py-2.5 shadow-[0_10px_26px_rgba(32,36,43,.14)] [animation-delay:0.5s]">
        <span className="animate-pmpulse bg-success h-2 w-2 flex-none rounded-full" />
        <span className="text-foreground whitespace-nowrap text-[13px] font-semibold">
          41 tin mới
        </span>
      </div>
      <div className="animate-pmup border-accent-soft-border absolute bottom-[132px] left-1/2 z-[2] ml-[60px] flex rotate-[5deg] items-center gap-2 rounded-full border bg-white px-3.5 py-2.5 shadow-[0_10px_26px_rgba(32,36,43,.14)] [animation-delay:0.6s]">
        <span className="bg-accent h-2 w-2 flex-none rounded-full" />
        <span className="text-foreground whitespace-nowrap text-[13px] font-semibold">
          ~3 phút đi bộ
        </span>
      </div>

      <div className="animate-pmup border-ink bg-background relative z-[1] h-[600px] w-[min(348px,100%)] overflow-hidden rounded-[42px] border-[10px] shadow-[0_26px_60px_rgba(32,36,43,.28)] [animation-delay:0.18s]">
        <div className="flex h-10 items-end justify-between px-[22px] pb-[5px] text-xs font-semibold">
          <span>9:41</span>
          <span className="border-ink h-2 w-4 rounded-[2.5px] border-[1.5px]" />
        </div>
        <div className="border-border flex items-center gap-1.5 border-b px-4 py-1">
          <span className="animate-pmpulse bg-success h-[7px] w-[7px] rounded-full" />
          <span className="text-sm font-semibold">Times City</span>
          <span className="text-xs text-gray-800">· bán kính 5 km</span>
        </div>
        <div className="flex flex-col gap-2.5 px-3.5 py-3">
          <div className="border-success rounded-2xl border-2 bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,.05)]">
            <div className="flex items-center justify-between">
              <span className="text-primary-darker font-mono text-[10.5px] font-medium">
                VỪA ĐĂNG · 3 PHÚT
              </span>
              <span className="text-[11px] text-gray-800">180 m</span>
            </div>
            <div className="mt-2.5 flex h-24 items-center justify-center rounded-[11px] bg-[repeating-linear-gradient(135deg,#E9ECEF,#E9ECEF_6px,#DCE1E6_6px,#DCE1E6_12px)] font-mono text-[10px] font-medium text-gray-800">
              ẢNH CHỤP TRONG APP
            </div>
            <div className="mt-2.5 text-sm font-semibold leading-[1.35]">
              Quán bún chả đầu ngõ còn 12 suất, ai qua thì qua sớm
            </div>
            <div className="mt-1.5 text-[11.5px] text-gray-800">~4 phút đi bộ · 8 bình luận</div>
          </div>
          <div className="border-accent-dark rounded-2xl border-2 bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-accent-text font-mono text-[10.5px] font-medium">
                5 GIỜ TRƯỚC
              </span>
              <span className="text-[11px] text-gray-800">620 m</span>
            </div>
            <div className="mt-2.5 text-sm font-semibold leading-[1.35]">
              Mất điện toà T4 từ 9h sáng, có ai biết bao giờ có lại không?
            </div>
            <div className="mt-1.5 text-[11.5px] text-gray-800">~9 phút đi bộ · 24 bình luận</div>
          </div>
          <div className="rounded-2xl border-2 border-gray-500 bg-white p-3 opacity-[.62]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] font-medium text-gray-800">
                SẮP HẾT HẠN · 22 GIỜ
              </span>
              <span className="text-[11px] text-gray-800">1,1 km</span>
            </div>
            <div className="mt-2.5 text-sm font-semibold leading-[1.35]">
              Nhặt được chùm chìa khoá ở sân sau, gửi bảo vệ toà T2
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-[linear-gradient(180deg,rgba(250,251,252,0),#FAFBFC_34%)] px-4 pb-4 pt-3">
          <span className="border-border flex h-11 flex-1 items-center rounded-full border bg-white px-4 text-[13px] text-gray-800">
            Có gì mới quanh đây?
          </span>
          <span className="from-primary flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br to-[#1A4794] text-xl font-semibold text-white shadow-[0_8px_18px_rgba(45,108,223,.34)]">
            +
          </span>
        </div>
      </div>
    </div>
  );
}
