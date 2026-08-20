'use client';

import { Pill } from '@/components/pill';
import {
  usePhoneVisibilityMonitor,
  type PhoneVisibilityMonitorItem,
} from '@/hooks/usePhoneVisibilityMonitor';

const MODE_LABEL: Record<PhoneVisibilityMonitorItem['phoneVisibility'], string> = {
  always: 'Luôn hiện',
  business_hours: 'Giờ hành chính',
  hidden: 'Ẩn',
};

const DAY_ABBR: Record<number, string> = {
  0: 'CN',
  1: 'T2',
  2: 'T3',
  3: 'T4',
  4: 'T5',
  5: 'T6',
  6: 'T7',
};

// Giám sát ẩn/hiện SĐT theo giờ — D3 (tai-lieu-chuc-nang.md #99, bussiness §9.4: "phát hiện
// merchant lạm dụng bật số liên tục 24/7 thay vì theo khung giờ hoạt động thật"). CHỈ XEM — không
// có hành động "buộc đổi chế độ" nào được mô tả trong bussiness, không tự bịa thêm.
export default function MerchantsD3Page() {
  const { items, error } = usePhoneVisibilityMonitor();

  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-5">Merchant</div>
          <div className="col-span-3">Chế độ hiện SĐT</div>
          <div className="col-span-4">Đã bật &quot;Luôn hiện&quot; bao lâu</div>
        </div>
        <MonitorBody items={items} />
      </div>
    </>
  );
}

function MonitorBody({ items }: { items: PhoneVisibilityMonitorItem[] | null }) {
  if (items === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (items.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">Chưa có merchant nào.</div>
    );
  }
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-5 font-medium">{item.businessName}</div>
          <div className="col-span-3">
            <Pill tone={item.phoneVisibility === 'always' ? 'warn' : 'neutral'}>
              {MODE_LABEL[item.phoneVisibility]}
            </Pill>
            {item.phoneVisibility === 'business_hours' ? (
              <div className="mt-1 font-mono text-[11px] text-stone-600">
                {item.businessHours.length === 0
                  ? 'chưa đặt ngày nào — đang ẩn cả tuần'
                  : item.businessHours
                      .slice()
                      .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                      .map((h) => `${DAY_ABBR[h.dayOfWeek]} ${h.startTime}–${h.endTime}`)
                      .join(', ')}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 font-mono text-xs">
            {item.alwaysVisibleForDays === null ? '—' : `~${item.alwaysVisibleForDays} ngày`}
          </div>
        </div>
      ))}
    </>
  );
}
