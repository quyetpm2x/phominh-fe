'use client';

import * as React from 'react';

import { HourHistogram } from '@/components/hour-histogram';
import { useUserActivityOverview } from '@/hooks/useUserActivityOverview';

function last7DaysRange(): { dateFrom: string; dateTo: string } {
  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 7);
  return { dateFrom: from.toISOString(), dateTo: to.toISOString() };
}

// Thống kê hoạt động người dùng — G9 (bổ sung ngoài 117 mục gốc, thảo luận 2026-08-17). KHÔNG dùng
// chung AnalyticsChrome/mock tab strip G1-G8 vì đây là dữ liệu thật, không thuộc bộ mock đó.
export default function UserActivityPage() {
  const [{ dateFrom, dateTo }] = React.useState(last7DaysRange);
  const { overview, error } = useUserActivityOverview(dateFrom, dateTo);

  return (
    <div>
      <div className="mb-4 text-sm text-stone-600">7 ngày gần nhất</div>

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
