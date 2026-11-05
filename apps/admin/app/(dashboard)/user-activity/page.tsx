'use client';

import * as React from 'react';

import { AnalyticsFilters } from '../analytics/_components/analytics-chrome';

import { HourHistogram } from '@/components/hour-histogram';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import { useUserActivityOverview } from '@/hooks/useUserActivityOverview';

function rangeOf(days: number): { dateFrom: string; dateTo: string } {
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - days);
  return { dateFrom: from.toISOString(), dateTo: to.toISOString() };
}

const DEFAULT_DAYS = 7;

// Thống kê hoạt động người dùng — G9 (bổ sung ngoài 117 mục gốc, thảo luận 2026-08-17). Lọc theo khu = người dùng có Nhà trong
// bán kính khu. Bọc Suspense vì bộ lọc đọc từ URL.
export default function UserActivityPage() {
  return (
    <React.Suspense fallback={<div className="text-sm text-stone-600">Đang tải…</div>}>
      <UserActivityContent />
    </React.Suspense>
  );
}

function UserActivityContent() {
  const { days, areaId } = useAnalyticsFilters(DEFAULT_DAYS);
  // Chốt mốc theo khoảng đã chọn: tính lại mỗi lần render sẽ đổi URL API liên tục và gọi lại không dừng.
  const { dateFrom, dateTo } = React.useMemo(() => rangeOf(days), [days]);
  const { overview, error } = useUserActivityOverview(dateFrom, dateTo, areaId);

  return (
    <div>
      <div className="mb-4">
        <AnalyticsFilters range area defaultDays={DEFAULT_DAYS} />
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-3.5">
        <StatCard label="User hoạt động" value={overview?.activeUserCount} />
        <StatCard label="Tổng lượt mở app" value={overview?.totalSessions} />
        <StatCard
          label="Thời lượng trung bình/lượt"
          value={overview ? `${overview.avgSessionMinutes.toFixed(1)} phút` : undefined}
        />
      </div>

      <div className="border-border bg-background mt-3.5 rounded-lg border p-4">
        <div className="text-sm font-semibold">Khung giờ hoạt động</div>
        <div className="mt-3">
          {overview ? <HourHistogram buckets={overview.hourHistogram} /> : null}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string | undefined }) {
  return (
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="text-xs text-stone-600">{label}</div>
      <div className="mt-1 font-mono text-2xl font-semibold">{value ?? '—'}</div>
    </div>
  );
}
