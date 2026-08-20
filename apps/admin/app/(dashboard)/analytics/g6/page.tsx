'use client';

import { AnalyticsChrome } from '../_components/analytics-chrome';

import { Pill } from '@/components/pill';
import { useMerchantRisk, type MerchantRiskItem } from '@/hooks/useMerchantRisk';

const STATUS_LABEL: Record<MerchantRiskItem['status'], string> = {
  ok: 'Ổn định',
  watch: 'Cần liên hệ',
  at_risk: 'Nguy cơ rời bỏ',
};
const STATUS_TONE: Record<MerchantRiskItem['status'], 'ok' | 'warn' | 'bad'> = {
  ok: 'ok',
  watch: 'warn',
  at_risk: 'bad',
};

// Chỉ số merchant — G6 (tai-lieu-chuc-nang.md #108). Trước đây toàn bộ mock tĩnh — nay bảng "số
// ngày kể từ lần đăng cuối" tính THẬT từ bảng posts (xem AnalyticsService.listMerchantRisk). Phần
// "gửi nhắc hàng loạt" và "số lượt bấm Hiện SĐT/Zalo" trong mock gốc CHƯA LÀM — cần hạ tầng gửi
// thông báo hàng loạt / theo dõi click riêng, ngoài phạm vi việc nối dữ liệu của phiên này.
export default function AnalyticsG6Page() {
  const { items, error } = useMerchantRisk();

  return (
    <>
      <AnalyticsChrome current="G6" />
      <div className="mt-3.5">
        {error ? (
          <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
            {error}
          </div>
        ) : null}
        <div className="border-border bg-background overflow-hidden rounded-lg border">
          <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            <div className="col-span-5">Merchant</div>
            <div className="col-span-3">Ngày từ lần đăng cuối</div>
            <div className="col-span-2">Bài/tuần</div>
            <div className="col-span-2">Trạng thái</div>
          </div>
          <RiskBody items={items} />
        </div>
      </div>
    </>
  );
}

function RiskBody({ items }: { items: MerchantRiskItem[] | null }) {
  if (items === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (items.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">Chưa có merchant nào.</div>
    );
  }
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-5 font-medium">{item.businessName}</div>
          <div className="col-span-3 font-mono">
            {item.daysSinceLastPost === null ? 'Chưa từng đăng' : `${item.daysSinceLastPost} ngày`}
          </div>
          <div className="col-span-2 font-mono">{item.postsPerWeek.toFixed(1)}</div>
          <div className="col-span-2">
            <Pill tone={STATUS_TONE[item.status]}>{STATUS_LABEL[item.status]}</Pill>
          </div>
        </div>
      ))}
    </>
  );
}
