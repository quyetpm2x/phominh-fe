'use client';
import { AnalyticsChrome } from '../_components/analytics-chrome';
import { StatCard } from '../_components/stat-card';

import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import { useSafetyReport, type SafetyReport } from '@/hooks/useSafetyReport';

// An toàn & kiểm duyệt — G7 (tai-lieu-chuc-nang.md #109, bussiness §9.7). 2 thuật toán phát hiện cụm tấn công / thông đồng đang
// hoãn có chủ ý (mục 89/93) nên hiện "Chưa bật", không hiện số 0 dễ bị hiểu là không có vấn đề.
export default function AnalyticsG7Page() {
  const { days } = useAnalyticsFilters();
  const { report, error } = useSafetyReport(days);

  return (
    <>
      <AnalyticsChrome current="G7" range />

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
        label="Report tin nhắn"
        value={report.messageReports.toLocaleString('vi-VN')}
        hint="Tin nhắn bị người nhận báo cáo"
      />
      <StatCard
        label="Lượt chặn người dùng"
        value={report.blockedUsers.toLocaleString('vi-VN')}
        hint="Người dùng chặn nhau trong kỳ"
      />
      <StatCard
        label="Lời mời nhắn tin chưa được chấp nhận"
        value={report.pendingMessageRequests.toLocaleString('vi-VN')}
        hint="Tạo trong kỳ, người nhận chưa chấp nhận hay trả lời"
      />
      <StatCard
        label="Cụm tấn công bình luận"
        value="Chưa bật"
        hint="Tính năng phát hiện đang hoãn có chủ ý"
      />
      <StatCard
        label="Cụm thông đồng vote"
        value="Chưa bật"
        hint="Tính năng phát hiện đang hoãn có chủ ý"
      />
    </div>
  );
}
