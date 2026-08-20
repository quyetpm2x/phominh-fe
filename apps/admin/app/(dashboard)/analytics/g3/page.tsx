'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { SnapshotTable, type SnapshotColumn } from '../_components/snapshot-table';

const pct = (v: number | null) => (v === null ? '—' : `${v}%`);

const COLUMNS: SnapshotColumn[] = [
  { header: 'Tài khoản mới', render: (i) => i.metrics.g3.newAccountsCount.toLocaleString('vi-VN') },
  {
    header: 'Tỷ lệ hoàn tất onboarding',
    render: (i) => pct(i.metrics.g3.onboardingCompletionRate),
  },
];

// Tăng trưởng & kích hoạt — G3 (tai-lieu-chuc-nang.md #107). "Tỷ lệ hoàn tất onboarding" tính bằng
// đã lưu ≥1 khu vực cố định trong ngày đăng ký (bước cuối bắt buộc của luồng onboarding). "Nguồn
// tải app" trong mock gốc KHÔNG tính được — cần SDK attribution (Adjust/AppsFlyer...) chưa tích hợp.
export default function AnalyticsG3Page() {
  return (
    <>
      <AnalyticsChrome current="G3" />
      <div className="border-admin-amber-soft-border bg-admin-amber-soft text-admin-amber-text mb-3.5 mt-3.5 rounded-lg border px-4 py-3 text-sm">
        Chưa tính được &quot;nguồn tải app&quot; — cần tích hợp SDK attribution (Adjust/AppsFlyer…),
        chưa có trong hệ thống hiện tại.
      </div>
      <SnapshotTable columns={COLUMNS} />
    </>
  );
}
