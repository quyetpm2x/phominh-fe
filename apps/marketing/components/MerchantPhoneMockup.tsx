export function MerchantPhoneMockup() {
  return (
    <div className="flex justify-center">
      <div className="bg-background text-foreground relative h-[610px] w-[300px] overflow-hidden rounded-[40px] border-[10px] border-[#171A20] shadow-[0_24px_54px_rgba(0,0,0,.4)]">
        <div className="flex h-9 items-end justify-between px-5 pb-1 text-[11.5px] font-semibold">
          <span>11:20</span>
          <span className="border-ink h-2 w-[15px] rounded-[2.5px] border-[1.5px]" />
        </div>
        <div className="border-border flex items-center gap-2 border-b px-3.5 py-2">
          <span className="bg-primary-soft-100 text-primary-darker flex h-[26px] w-[26px] items-center justify-center rounded-lg text-xs font-bold">
            L
          </span>
          <span className="flex-1 text-[13.5px] font-semibold">Trang quán của anh Long</span>
        </div>
        <div className="flex flex-col gap-2.5 px-3.5 py-3">
          <div className="border-success rounded-[15px] border-2 bg-white p-2.5">
            <div className="flex justify-between">
              <span className="text-primary-darker font-mono text-[10px] font-medium">
                VỪA ĐĂNG
              </span>
              <span className="text-accent-text font-mono text-[10px] font-medium">CÒN 23:52</span>
            </div>
            <div className="mt-2 flex h-[104px] items-center justify-center rounded-[11px] bg-[repeating-linear-gradient(135deg,#E9ECEF,#E9ECEF_6px,#DCE1E6_6px,#DCE1E6_12px)] font-mono text-[9.5px] font-medium text-gray-800">
              ẢNH MÓN HÔM NAY
            </div>
            <div className="mt-2 text-[13.5px] font-semibold leading-[1.35]">
              Còn 5 suất bún, ai qua thì qua sớm nhé
            </div>
            <div className="mt-2 flex gap-3.5 text-[11px] text-gray-800">
              <span>124 lượt xem</span>
              <span>9 người lưu</span>
            </div>
          </div>
          <div className="border-border flex flex-col gap-2 rounded-[15px] border bg-white p-2.5">
            <div className="text-[12.5px] font-semibold">Hiện số Zalo trong giờ bán</div>
            <div className="flex items-center gap-2.5">
              <span className="flex-1 font-mono text-[11px] text-gray-800">06:00 – 13:30</span>
              <span className="bg-success flex h-[22px] w-[38px] items-center justify-end rounded-full p-0.5">
                <span className="h-[18px] w-[18px] rounded-full bg-white" />
              </span>
            </div>
          </div>
          <div className="rounded-[15px] border-2 border-gray-500 bg-white p-2.5 opacity-60">
            <div className="font-mono text-[10px] font-medium text-gray-800">
              HÔM QUA · ĐÃ TỰ ẨN
            </div>
            <div className="mt-1.5 text-[13px] font-semibold">Hết bún, mai mở lại từ 6h sáng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
