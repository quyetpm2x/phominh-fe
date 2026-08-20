'use client';

import { ReportQueueView } from '@/components/report-queue-view';
import type { ReportItem } from '@/hooks/useReportQueue';

// Report "nghi ngờ bán chuyên nghiệp trá hình" — D2 (tai-lieu-chuc-nang.md #98). Trước đây user
// TẠO được report này (mục 31) nhưng không route admin nào đọc lại. Không có nút "gỡ" riêng như
// B1/B2 (post/comment) — chỉ Giữ/Cảnh cáo, phạt điểm E2 chọn theo mức độ (dùng chung
// ReportsService.updateStatus(), đã hỗ trợ sẵn report.merchantId từ trước).
export default function MerchantsD2Page() {
  return (
    <ReportQueueView
      endpoint="/api/admin/reports/merchant-suspicious"
      renderContent={(report) => ({ node: <MerchantContent report={report} />, canAct: true })}
    />
  );
}

function MerchantContent({ report }: { report: ReportItem }) {
  const merchant = report.merchant;
  if (!merchant) return <div className="text-sm text-stone-600">(Không tìm thấy hồ sơ quán)</div>;

  return (
    <div>
      <div className="text-sm font-medium">{merchant.businessName}</div>
      <div className="mt-1 text-xs text-stone-600">{merchant.addressText}</div>
    </div>
  );
}
