'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { TrendLine, type TrendPoint } from '../_components/trend-line';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';

interface FreshFeedRate {
  days: number;
  percentage: number | null;
  sessionsWithNewPost: number;
  totalSessions: number;
  trend: TrendPoint[];
}

const DEFAULT_DAYS = 7;

// G1 — Tỉ lệ thấy bài mới: % lượt mở app thấy ít nhất 1 bài mới. Lọc theo khu = người dùng có Nhà trong bán kính khu.
export default function AnalyticsG1Page() {
  const { query } = useAnalyticsFilters(DEFAULT_DAYS);
  const { data, error } = useAdminResource<FreshFeedRate>(
    `/api/admin/analytics/fresh-feed-rate?${query}`,
  );
  return (
    <>
      <AnalyticsChrome current="G1" range area defaultDays={DEFAULT_DAYS} />
      <div className="mt-3.5">
        <AdminError message={error} />
        {data ? <Hero data={data} /> : null}
        {!data && !error ? <div className="text-sm text-stone-600">Đang tải…</div> : null}
      </div>
    </>
  );
}

function Hero({ data }: { data: FreshFeedRate }) {
  return (
    <div className="border-border bg-background rounded-lg border p-6">
      <div className="text-sm font-semibold">
        Tỷ lệ lần mở app thấy ít nhất 1 bài mới trong bán kính
      </div>
      <div className="mt-1 text-xs text-stone-600">
        Dưới 40% nghĩa là phần lớn người mở app thấy dòng tin cũ hoặc trống — {data.days} ngày gần
        nhất.
      </div>
      <div className="mt-4 font-mono text-5xl font-semibold text-stone-900">
        {data.percentage === null ? '—' : `${data.percentage.toFixed(1)}%`}
      </div>
      <div className="mb-4 mt-2 text-xs text-stone-600">
        {data.sessionsWithNewPost.toLocaleString('vi-VN')} /{' '}
        {data.totalSessions.toLocaleString('vi-VN')} lượt mở app thấy bài mới
      </div>
      <TrendLine points={data.trend} label="% theo ngày" />
    </div>
  );
}
