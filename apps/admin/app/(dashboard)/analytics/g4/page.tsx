'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { SnapshotTable, type SnapshotColumn } from '../_components/snapshot-table';
import { TrendLine } from '../_components/trend-line';

import { useAdminResource } from '@/hooks/useAdminResource';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';

interface SnapshotDay {
  snapshotDate: string;
  metrics: { g4?: { retentionD1: number | null; retentionD7: number | null } };
}

const pct = (v: number | null) => (v === null ? '—' : `${v}%`);

const COLUMNS: SnapshotColumn[] = [
  { header: 'D1', render: (i) => pct(i.metrics.g4.retentionD1) },
  { header: 'D7', render: (i) => pct(i.metrics.g4.retentionD7) },
  { header: 'D30', render: (i) => pct(i.metrics.g4.retentionD30) },
];

// Giữ chân người dùng — G4 (tai-lieu-chuc-nang.md #107). Retention kiểu cổ điển (không luỹ kế):
// trong cohort đăng ký đúng N ngày trước, bao nhiêu % có mở app đúng vào ngày đang xét. "—" = cohort
// ngày đó rỗng (chưa đủ N ngày kể từ lúc khu vực/hệ thống có user đầu tiên, hoặc không có ai đăng ký
// đúng ngày đó).
export default function AnalyticsG4Page() {
  const { query } = useAnalyticsFilters();
  const { data: history } = useAdminResource<SnapshotDay[]>(
    `/api/admin/analytics/snapshot-history?${query}`,
  );
  const line = (key: 'retentionD1' | 'retentionD7') =>
    (history ?? []).map((day) => ({
      day: day.snapshotDate.slice(0, 10),
      percent: day.metrics.g4?.[key] ?? null,
    }));
  return (
    <>
      <AnalyticsChrome current="G4" range area />
      <div className="mt-3.5 flex flex-col gap-3.5">
        <SnapshotTable columns={COLUMNS} />
        <div className="border-border bg-background rounded-lg border p-5">
          <h2 className="mb-3 text-sm font-semibold">Giữ chân D1 theo ngày</h2>
          <TrendLine label="D1" points={line('retentionD1')} />
        </div>
        <div className="border-border bg-background rounded-lg border p-5">
          <h2 className="mb-3 text-sm font-semibold">Giữ chân D7 theo ngày</h2>
          <TrendLine label="D7" points={line('retentionD7')} />
        </div>
      </div>
    </>
  );
}
