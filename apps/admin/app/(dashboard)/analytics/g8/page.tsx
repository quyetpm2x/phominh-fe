'use client';

import { ActualCosts } from '../_components/actual-costs';
import { AnalyticsChrome } from '../_components/analytics-chrome';
import { StatCard } from '../_components/stat-card';

import { useCostEstimate, type CostEstimateReport } from '@/hooks/useCostEstimate';

const vnd = (n: number) => `${n.toLocaleString('vi-VN')}đ`;

// Chi phí vận hành — G8 (tai-lieu-chuc-nang.md #110, bussiness §9.7). CHỈ Owner xem được — backend
// tự chặn 403 cho admin thường (OwnerOnlyGuard), không phải quyền cấp được qua checkbox thông
// thường. Số liệu là ƯỚC LƯỢNG (số lượng đếm được × đơn giá cấu hình), không phải hoá đơn thật.
export default function AnalyticsG8Page() {
  const { report, error, reload } = useCostEstimate();

  return (
    <>
      <AnalyticsChrome current="G8" />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mt-3.5 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <CostBody report={report} error={error} />
      {report ? <ActualCosts rows={report.actualCosts} onSaved={reload} /> : null}
    </>
  );
}

function CostBody({ report, error }: { report: CostEstimateReport | null; error: string | null }) {
  if (report) return <CostGrid report={report} />;
  if (error) return null;
  return <div className="mt-3.5 px-1 py-4 text-sm text-stone-600">Đang tải…</div>;
}

function CostGrid({ report }: { report: CostEstimateReport }) {
  return (
    <>
      <div className="border-admin-amber-soft-border bg-admin-amber-soft text-admin-amber-text mb-3.5 mt-3.5 rounded-lg border px-4 py-3 text-sm">
        Số liệu ƯỚC LƯỢNG ({report.windowDays} ngày gần nhất) — nhân số lượng đếm được với đơn giá
        cấu hình, không phải số hoá đơn thật từ nhà cung cấp.
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        <StatCard
          label="Chi phí SMS OTP"
          value={vnd(report.smsCostVnd)}
          hint={`${report.smsCount.toLocaleString('vi-VN')} lượt gửi`}
        />
        <StatCard
          label="Chi phí lưu trữ ảnh (R2)"
          value={`${vnd(report.storageCostVndPerMonth)} / tháng`}
          hint={`${report.imageCount.toLocaleString('vi-VN')} ảnh đang lưu`}
        />
        <StatCard
          label="Chi phí Vision API"
          value={vnd(report.visionApiCostVnd)}
          hint="Chưa tích hợp — chi phí thật sự là 0"
        />
        <StatCard
          label="Tổng chi phí ước tính"
          value={vnd(report.totalCostVnd)}
          hint="SMS + lưu trữ + Vision API"
        />
        <StatCard
          label="Chi phí trung bình / user hoạt động"
          value={report.costPerActiveUserVnd === null ? '—' : vnd(report.costPerActiveUserVnd)}
          hint={`${report.activeUsers.toLocaleString('vi-VN')} user hoạt động trong kỳ`}
        />
      </div>
    </>
  );
}
