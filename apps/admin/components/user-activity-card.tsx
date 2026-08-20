'use client';

import { useUserActivityDetail } from '@/hooks/useUserActivityDetail';

// Hoạt động 30 ngày gần nhất (bổ sung ngoài 117 mục gốc, thảo luận 2026-08-17) — thêm vào C2 (chi
// tiết người dùng, tai-lieu-chuc-nang.md #92). Thời lượng THẬT từ app_sessions.closed_at.
export function UserActivityCard({ userId }: { userId: string }) {
  const { detail, error } = useUserActivityDetail(userId);

  return (
    <div className="border-border bg-background w-72 flex-none rounded-lg border p-5">
      <div className="text-sm font-semibold">Hoạt động 30 ngày qua</div>
      {error ? <div className="text-admin-red mt-2 text-xs">{error}</div> : null}
      {!detail ? (
        <div className="mt-2 text-xs text-stone-600">Đang tải…</div>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          <Fact label="Số lượt mở app" value={String(detail.sessionCount)} />
          <Fact label="Tổng thời gian dùng" value={`${Math.round(detail.totalMinutes)} phút`} />
          <Fact label="Trung bình/lượt" value={`${detail.avgSessionMinutes.toFixed(1)} phút`} />
          <Fact
            label="Giờ hoạt động nhiều nhất"
            value={detail.peakHour === null ? '—' : `${detail.peakHour}h`}
          />
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-stone-100 pb-2 text-xs">
      <span className="text-stone-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
