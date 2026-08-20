'use client';

import type { ReactNode } from 'react';

import { useLatestSnapshots, type LatestSnapshotItem } from '@/hooks/useLatestSnapshots';

export interface SnapshotColumn {
  header: string;
  render: (item: LatestSnapshotItem) => ReactNode;
}

// Bảng dùng chung cho G2/G3/G4 — 1 dòng/khu thí điểm (+ "Toàn hệ thống"), cột tuỳ trang truyền vào.
export function SnapshotTable({ columns }: { columns: SnapshotColumn[] }) {
  const { items, error } = useLatestSnapshots();

  if (error) {
    return (
      <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-lg border px-4 py-3 text-sm">
        {error}
      </div>
    );
  }
  if (items === null) {
    return <div className="px-1 py-4 text-sm text-stone-600">Đang tải…</div>;
  }
  if (items.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border px-5 py-8 text-center text-sm text-stone-600">
        Chưa có snapshot nào — cron tính lúc 3h sáng, có thể khu vực vừa tạo hoặc cron chưa chạy lần
        nào.
      </div>
    );
  }

  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border">
      <div
        className="grid gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500"
        style={{ gridTemplateColumns: `1.4fr repeat(${columns.length}, 1fr)` }}
      >
        <div>Khu vực</div>
        {columns.map((c) => (
          <div key={c.header}>{c.header}</div>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.areaId ?? 'system'}
          className="border-stone-75 grid items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
          style={{ gridTemplateColumns: `1.4fr repeat(${columns.length}, 1fr)` }}
        >
          <div>
            <div className="font-medium">{item.areaName}</div>
            <div className="font-mono text-xs text-stone-500">
              {new Date(item.snapshotDate).toLocaleDateString('vi-VN')}
            </div>
          </div>
          {columns.map((c) => (
            <div key={c.header}>{c.render(item)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
