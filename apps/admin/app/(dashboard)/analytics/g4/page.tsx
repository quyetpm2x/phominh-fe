'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { SnapshotTable, type SnapshotColumn } from '../_components/snapshot-table';

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
  return (
    <>
      <AnalyticsChrome current="G4" />
      <div className="mt-3.5">
        <SnapshotTable columns={COLUMNS} />
      </div>
    </>
  );
}
