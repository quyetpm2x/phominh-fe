'use client';
import { AnalyticsChrome } from '../_components/analytics-chrome';

import { useNorthStarMetric } from '@/hooks/useNorthStarMetric';

// Tổng quan — Bắc Đẩu — G1 (tai-lieu-chuc-nang.md #106). Trước đây `computeNorthStarMetric()` ném
// NotImplementedException với lý do "chưa có bảng theo dõi lượt xem" — SAI, bảng `post_views` đã
// tồn tại sẵn từ mục 44 và đủ dữ liệu để tính THẬT (xem comment chi tiết ở `analytics.service.ts`).
// Chỉ hiện đúng con số cốt lõi (hero) — xu hướng 90 ngày, so sánh từng khu, "Retention D7" trong
// mock gốc CẦN dữ liệu theo NGÀY/KHU VỰC (bảng `daily_metrics_snapshots` + cron tính, thuộc phạm vi
// mục 107 "Sức khỏe theo khu vực" — vẫn CHỈ CÓ MOCK FE), không bịa thêm ở đây.
export default function AnalyticsG1Page() {
  return (
    <>
      <AnalyticsChrome current="G1" />
      <div className="mt-3.5">
        <NorthStarHero />
      </div>
    </>
  );
}

function NorthStarHero() {
  const { metric, error } = useNorthStarMetric();

  if (error) {
    return (
      <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-lg border px-4 py-3 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="border-border bg-background rounded-lg border p-6">
      <div className="text-sm font-semibold">
        Tỷ lệ lần mở app thấy ít nhất 1 bài mới trong bán kính
      </div>
      <div className="mt-1 text-xs text-stone-600">
        Dưới 40% nghĩa là phần lớn người mở app thấy feed cũ hoặc trống — 7 ngày gần nhất.
      </div>
      <div className="mt-4 font-mono text-5xl font-semibold text-stone-900">
        {metric ? `${metric.percentage.toFixed(1)}%` : '—'}
      </div>
      {metric ? (
        <div className="mt-2 text-xs text-stone-600">
          {metric.sessionsWithNewPost.toLocaleString('vi-VN')} /{' '}
          {metric.totalSessions.toLocaleString('vi-VN')} lượt mở app thấy bài mới
        </div>
      ) : null}
    </div>
  );
}
