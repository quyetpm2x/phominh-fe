'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { SnapshotTable, type SnapshotColumn } from '../_components/snapshot-table';

const COLUMNS: SnapshotColumn[] = [
  { header: 'Bài mới', render: (i) => i.metrics.g2.newPostsCount.toLocaleString('vi-VN') },
  {
    header: 'Đời sống / Cửa hàng / Khẩn cấp',
    render: (i) => {
      const r = i.metrics.g2.postTypeRatio;
      return `${r.life}% / ${r.merchant}% / ${r.emergency}%`;
    },
  },
  {
    header: 'Tuổi TB bài lúc xem',
    render: (i) =>
      i.metrics.g2.avgPostAgeHoursWhenViewed === null
        ? '—'
        : `${i.metrics.g2.avgPostAgeHoursWhenViewed} giờ`,
  },
];

// Sức khỏe nội dung — G2 (tai-lieu-chuc-nang.md #107). "% thời gian feed trống" trong mock gốc
// KHÔNG tính được — cần theo dõi liên tục (mỗi lần ai đó mở feed), ngoài phạm vi 1 cron chạy 1
// lần/ngày, không bịa số.
export default function AnalyticsG2Page() {
  return (
    <>
      <AnalyticsChrome current="G2" />
      <div className="border-admin-amber-soft-border bg-admin-amber-soft text-admin-amber-text mb-3.5 mt-3.5 rounded-lg border px-4 py-3 text-sm">
        Chưa tính được &quot;% thời gian feed trống&quot; — cần theo dõi liên tục, ngoài phạm vi
        snapshot tính 1 lần/ngày.
      </div>
      <SnapshotTable columns={COLUMNS} />
    </>
  );
}
