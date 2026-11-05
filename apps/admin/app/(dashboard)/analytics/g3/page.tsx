'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';
import { SnapshotTable, type SnapshotColumn } from '../_components/snapshot-table';
import { StatCard } from '../_components/stat-card';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';

const pct = (v: number | null) => (v === null ? '—' : `${v}%`);

const COLUMNS: SnapshotColumn[] = [
  { header: 'Tài khoản mới', render: (i) => i.metrics.g3.newAccountsCount.toLocaleString('vi-VN') },
  {
    header: 'Tỷ lệ hoàn tất onboarding',
    render: (i) => pct(i.metrics.g3.onboardingCompletionRate),
  },
];

interface Funnel {
  steps: { label: string; count: number; percentOfFirst: number | null }[];
  otp: { sent: number; verified: number; successPercent: number };
  quickLoginApprox: number;
}

// G3 — Tăng trưởng & kích hoạt. Phễu theo tài khoản đăng ký trong khoảng đã chọn. OTP chưa gắn tài khoản nên luôn tính toàn hệ thống.
// "Nguồn tải app" cần SDK attribution (Adjust/AppsFlyer…) nên chưa có.
export default function AnalyticsG3Page() {
  const { query } = useAnalyticsFilters();
  const { data, error } = useAdminResource<Funnel>(`/api/admin/analytics/funnel?${query}`);
  return (
    <>
      <AnalyticsChrome current="G3" range area />
      <div className="mt-3.5 flex flex-col gap-3.5">
        <AdminError message={error} />
        {data ? <FunnelCard funnel={data} /> : null}
        {data ? (
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
            <StatCard
              label="OTP xác thực thành công"
              value={`${data.otp.successPercent}%`}
              hint={`${data.otp.verified.toLocaleString('vi-VN')} / ${data.otp.sent.toLocaleString('vi-VN')} lượt gửi · toàn hệ thống`}
            />
            <StatCard
              label="Đăng nhập nhanh (xấp xỉ)"
              value={data.quickLoginApprox.toLocaleString('vi-VN')}
              hint="Gồm cả token bị bỏ khi xoá gợi ý, nên có thể cao hơn số lần dùng thật"
            />
          </div>
        ) : null}
        <SnapshotTable columns={COLUMNS} />
      </div>
    </>
  );
}

function FunnelCard({ funnel }: { funnel: Funnel }) {
  return (
    <div className="border-border bg-background rounded-lg border p-5">
      <h2 className="mb-3 text-sm font-semibold">Phễu đăng ký</h2>
      {funnel.steps.map((step) => (
        <div key={step.label} className="mb-2 text-sm">
          <div className="flex justify-between">
            <span>{step.label}</span>
            <span className="font-mono">
              {step.count.toLocaleString('vi-VN')}
              {step.percentOfFirst === null ? '' : ` · ${step.percentOfFirst}%`}
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded bg-stone-100">
            <div
              className="h-1.5 rounded bg-stone-800"
              style={{ width: `${step.percentOfFirst ?? 0}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
