'use client';

import { useState } from 'react';

import { Pill } from '@/components/pill';
import { useAdminMerchants, type AdminMerchantItem } from '@/hooks/useAdminMerchants';

const PHONE_VISIBILITY_LABEL: Record<AdminMerchantItem['phoneVisibility'], string> = {
  always: 'Luôn hiện',
  business_hours: 'Giờ mở cửa',
  hidden: 'Ẩn',
};

// Danh sách merchant — D1 (tai-lieu-chuc-nang.md #97). Dữ liệu THẬT từ bảng merchant_profiles, thay
// hẳn mock MERCHANTS[] cũ. KHÔNG có cột "duyệt đăng ký" như tên mục gốc gợi ý — đăng ký merchant đã
// tự động xác minh ngay từ lúc đăng ký (mục 39, bỏ yêu cầu chụp mặt tiền), màn này chỉ để giám sát.
export default function MerchantsD1Page() {
  const { merchants, error, loading, search } = useAdminMerchants();
  const [query, setQuery] = useState('');

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void search(query);
        }}
        className="mb-4 flex gap-2"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên quán hoặc địa chỉ"
          className="border-border flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Đang tìm…' : 'Tìm'}
        </button>
      </form>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-3">Merchant</div>
          <div className="col-span-2">Ngành hàng</div>
          <div className="col-span-3">Địa chỉ</div>
          <div className="col-span-2">Bài 7 ngày</div>
          <div className="col-span-2">Hiện SĐT</div>
        </div>
        <MerchantsListBody merchants={merchants} />
      </div>
    </>
  );
}

function MerchantsListBody({ merchants }: { merchants: AdminMerchantItem[] | null }) {
  if (merchants === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (merchants.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">
        Không tìm thấy merchant nào.
      </div>
    );
  }
  return (
    <>
      {merchants.map((m) => (
        <div
          key={m.id}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-3 flex items-center gap-2">
            <span className="font-medium">{m.businessName}</span>
            {m.isVerified ? (
              <Pill tone="ok">Đã xác minh</Pill>
            ) : (
              <Pill tone="warn">Chưa xác minh</Pill>
            )}
          </div>
          <div className="col-span-2 text-stone-700">{m.category ?? '—'}</div>
          <div className="col-span-3 text-stone-700">{m.addressText}</div>
          <div className="col-span-2">{m.recentPostCount}</div>
          <div className="col-span-2 text-stone-700">
            {PHONE_VISIBILITY_LABEL[m.phoneVisibility]}
          </div>
        </div>
      ))}
    </>
  );
}
