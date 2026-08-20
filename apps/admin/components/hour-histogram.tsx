'use client';

import type { HourBucket } from '@/hooks/useUserActivityOverview';

// Biểu đồ cột 24 giờ (bổ sung ngoài 117 mục gốc) — dùng chung cho tổng quan G9 và phần hoạt động
// trong C2, thuần CSS, không cần thư viện chart.
export function HourHistogram({ buckets }: { buckets: HourBucket[] }) {
  const countByHour = new Map(buckets.map((b) => [b.hour, b.count]));
  const max = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <div className="flex h-24 items-end gap-1">
      {Array.from({ length: 24 }, (_, hour) => {
        const count = countByHour.get(hour) ?? 0;
        return (
          <div
            key={hour}
            className="flex flex-1 flex-col items-center gap-1"
            title={`${hour}h: ${count}`}
          >
            <div
              className="w-full rounded-sm bg-stone-800"
              style={{ height: `${Math.max(2, (count / max) * 100)}%` }}
            />
            {hour % 6 === 0 ? <span className="text-[10px] text-stone-500">{hour}h</span> : null}
          </div>
        );
      })}
    </div>
  );
}
