'use client';

import { Pill } from '@/components/pill';
import { useDataDeletions, type PendingDeletionItem } from '@/hooks/useDataDeletions';

// Xử lý yêu cầu xóa dữ liệu (tai-lieu-chuc-nang.md #104, NĐ 13/2023) — trước đây chỉ có luồng tự
// động (cron hard-delete sau 30 ngày), admin không có cách nào chủ động xem/đẩy nhanh khi cần gấp
// (VD yêu cầu chính thức qua kênh khác cần xử lý trong thời hạn luật định).
export default function LegalF2Page() {
  const { items, error, pendingId, expedite } = useDataDeletions();

  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-4">Người dùng</div>
          <div className="col-span-3">Yêu cầu lúc</div>
          <div className="col-span-3">Còn lại</div>
          <div className="col-span-2">Hành động</div>
        </div>
        <ListBody items={items} pendingId={pendingId} onExpedite={(id) => void expedite(id)} />
      </div>
    </>
  );
}

function ListBody({
  items,
  pendingId,
  onExpedite,
}: {
  items: PendingDeletionItem[] | null;
  pendingId: string | null;
  onExpedite: (userId: string) => void;
}) {
  if (items === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (items.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">
        Không có yêu cầu xoá dữ liệu nào đang chờ.
      </div>
    );
  }
  return (
    <>
      {items.map((item) => (
        <DeletionRow
          key={item.id}
          item={item}
          pending={pendingId === item.userId}
          onExpedite={onExpedite}
        />
      ))}
    </>
  );
}

function DeletionRow({
  item,
  pending,
  onExpedite,
}: {
  item: PendingDeletionItem;
  pending: boolean;
  onExpedite: (userId: string) => void;
}) {
  return (
    <div className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0">
      <div className="col-span-4">
        <span className="block font-medium">{item.alias}</span>
        <span className="block font-mono text-xs text-stone-600">{item.phoneNumber}</span>
      </div>
      <div className="col-span-3 text-stone-700">
        {new Date(item.requestedAt).toLocaleDateString('vi-VN')}
      </div>
      <div className="col-span-3">
        <Pill tone={item.daysRemaining <= 3 ? 'bad' : 'neutral'}>{item.daysRemaining} ngày</Pill>
      </div>
      <div className="col-span-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (
              window.confirm(
                `Xoá vĩnh viễn tài khoản "${item.alias}" ngay bây giờ? Không thể hoàn tác.`,
              )
            ) {
              onExpedite(item.userId);
            }
          }}
          className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-md border px-2.5 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          {pending ? 'Đang xoá…' : 'Xử lý ngay'}
        </button>
      </div>
    </div>
  );
}
