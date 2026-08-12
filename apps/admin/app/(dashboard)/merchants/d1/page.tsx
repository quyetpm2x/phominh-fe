import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { MERCHANTS } from '@/lib/mock/merchants';

// Danh sách merchant — D1 (tài liệu nghiệp vụ).
export default function MerchantsD1Page() {
  return (
    <ScreenAccessGuard screen="D1">
      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-4">Merchant</div>
          <div className="col-span-2">Ngành hàng</div>
          <div className="col-span-2">Khu vực</div>
          <div className="col-span-1">Bài 7 ngày</div>
          <div className="col-span-1">Lượt hiện SĐT</div>
          <div className="col-span-2">Trạng thái</div>
        </div>
        {MERCHANTS.map((m) => (
          <div
            key={m.name}
            className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
          >
            <div className="col-span-4 font-medium">{m.name}</div>
            <div className="col-span-2 text-stone-700">{m.cat}</div>
            <div className="col-span-2 text-stone-700">{m.area}</div>
            <div className="col-span-1">{m.posts}</div>
            <div className="col-span-1">{m.reveals}</div>
            <div className="col-span-2">
              <Pill tone={m.tone}>{m.status}</Pill>
            </div>
          </div>
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
