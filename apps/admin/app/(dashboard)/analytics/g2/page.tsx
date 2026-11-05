'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { SnapshotTable, type SnapshotColumn } from '../_components/snapshot-table';
import { TrendLine } from '../_components/trend-line';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';

const COLUMNS: SnapshotColumn[] = [
  { header: 'Bài mới', render: (i) => i.metrics.g2.newPostsCount.toLocaleString('vi-VN') },
  {
    header: 'Dòng tin trống',
    render: (i) =>
      i.metrics.g2.emptyFeedPercent == null ? '—' : `${i.metrics.g2.emptyFeedPercent}%`,
  },
  {
    header: 'Tuổi TB bài lúc xem',
    render: (i) =>
      i.metrics.g2.avgPostAgeHoursWhenViewed === null
        ? '—'
        : `${i.metrics.g2.avgPostAgeHoursWhenViewed} giờ`,
  },
];

interface SnapshotDay {
  snapshotDate: string;
  metrics: { g2?: { emptyFeedPercent?: number | null } };
}

// Sức khỏe nội dung — G2. "Dòng tin trống" tính theo lượt mở app: trong bán kính Nhà không có bài nào còn hiệu lực. Bảng là bản
// mới nhất của từng khu; xu hướng và chủ đề theo bộ lọc.
export default function AnalyticsG2Page() {
  const { query } = useAnalyticsFilters();
  const { data: topics, error } = useAdminResource<{ topic: string; posts: number }[]>(
    `/api/admin/analytics/topics?${query}`,
  );
  const { data: history } = useAdminResource<SnapshotDay[]>(
    `/api/admin/analytics/snapshot-history?${query}`,
  );
  return (
    <>
      <AnalyticsChrome current="G2" range area />
      <div className="mt-3.5 flex flex-col gap-3.5">
        <SnapshotTable columns={COLUMNS} />
        <AdminError message={error} />
        <div className="border-border bg-background rounded-lg border p-5">
          <h2 className="mb-3 text-sm font-semibold">% lượt mở app thấy dòng tin trống</h2>
          <TrendLine
            label="% theo ngày"
            points={(history ?? []).map((day) => ({
              day: day.snapshotDate.slice(0, 10),
              percent: day.metrics.g2?.emptyFeedPercent ?? null,
            }))}
          />
        </div>
        <div className="border-border bg-background rounded-lg border p-5">
          <h2 className="mb-3 text-sm font-semibold">Bài theo chủ đề</h2>
          {topics?.length === 0 ? <p className="text-sm text-stone-600">Chưa có bài nào.</p> : null}
          {topics?.map((row) => (
            <div key={row.topic} className="flex justify-between py-1 text-sm">
              <span className="font-mono text-xs">{row.topic}</span>
              <span className="font-mono">{row.posts.toLocaleString('vi-VN')}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
