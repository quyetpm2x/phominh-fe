'use client';
import { AnalyticsChrome } from '../_components/analytics-chrome';

import { useSafetyReport, type SafetyReport } from '@/hooks/useSafetyReport';

// An toàn & kiểm duyệt — G7 (tai-lieu-chuc-nang.md #109, bussiness §9.7). "Số lần phát hiện cụm tấn
// công"/"số cụm thông đồng vote" LUÔN hiện 0 — không phải lỗi, cả 2 thuật toán phát hiện đang HOÃN
// CÓ CHỦ Ý (mục 89/93), xem SafetyReportService.getSafetyReport() phía backend.
export default function AnalyticsG7Page() {
  const { report, error } = useSafetyReport();

  return (
    <>
      <AnalyticsChrome current="G7" />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mt-3.5 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      {report ? (
        <ReportGrid report={report} />
      ) : (
        <div className="mt-3.5 px-1 py-4 text-sm text-stone-600">Đang tải…</div>
      )}
    </>
  );
}

function ReportGrid({ report }: { report: SafetyReport }) {
  return (
    <div className="mt-3.5 grid grid-cols-2 gap-3.5">
      <StatCard
        label={`Tỷ lệ report / tổng bài đăng (${report.windowDays} ngày)`}
        value={`${report.reportRatePercent}%`}
        hint={`${report.totalReports.toLocaleString('vi-VN')} report / ${report.totalPosts.toLocaleString('vi-VN')} bài`}
      />
      <StatCard
        label="Thời gian xử lý report trung bình"
        value={report.avgReviewTimeHours === null ? '—' : `${report.avgReviewTimeHours} giờ`}
        hint="Từ lúc gửi report tới lúc admin xử lý lần đầu"
      />
      <StatCard
        label="Thời gian trung bình tin khẩn cấp đạt đủ xác nhận"
        value={
          report.avgEmergencyVerificationHours === null
            ? '—'
            : `${report.avgEmergencyVerificationHours} giờ`
        }
        hint="Từ lúc đăng tới lúc đủ 3 xác nhận độc lập"
      />
      <StatCard
        label="Cụm tấn công bình luận bị phát hiện"
        value={report.commentAttackIncidentCount.toLocaleString('vi-VN')}
        hint="Tính năng phát hiện đang hoãn có chủ ý — luôn 0"
      />
      <StatCard
        label="Cụm thông đồng vote bị phát hiện"
        value={report.voteCollusionFlagCount.toLocaleString('vi-VN')}
        hint="Tính năng phát hiện đang hoãn có chủ ý — luôn 0"
      />
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="border-border bg-background rounded-lg border p-6">
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-3 font-mono text-3xl font-semibold text-stone-900">{value}</div>
      <div className="mt-2 text-xs text-stone-600">{hint}</div>
    </div>
  );
}
