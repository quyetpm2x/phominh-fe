'use client';

import { Pill } from '@/components/pill';
import { usePenaltyAppeals, type PenaltyAppealItem } from '@/hooks/usePenaltyAppeals';

const SEVERITY_LABEL: Record<NonNullable<PenaltyAppealItem['penaltySeverity']>, string> = {
  light: 'Nhẹ',
  medium: 'Trung bình',
  severe: 'Nghiêm trọng',
};

// Xử lý khiếu nại phạt oan (tai-lieu-chuc-nang.md #96, ScreenId C6) — trước đây model PenaltyAppeal
// orphaned hoàn toàn, không service/controller/FE nào dùng. Duyệt = tạo bản ghi appeal_reversal
// (loại trừ hẳn vi phạm gốc khỏi tổng E2, xem PenaltyAppealsService.review).
export default function UsersC6Page() {
  const { items, error, pendingId, review } = usePenaltyAppeals();

  return (
    <div>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}
      <ListBody
        items={items}
        pendingId={pendingId}
        onReview={(id, decision) => void review(id, decision)}
      />
    </div>
  );
}

function ListBody({
  items,
  pendingId,
  onReview,
}: {
  items: PenaltyAppealItem[] | null;
  pendingId: string | null;
  onReview: (id: string, decision: 'approved' | 'rejected') => void;
}) {
  if (items === null) return <div className="text-sm text-stone-600">Đang tải…</div>;
  if (items.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border px-5 py-8 text-center text-sm text-stone-600">
        Không có khiếu nại nào đang chờ xử lý.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <AppealCard key={item.id} item={item} pending={pendingId === item.id} onReview={onReview} />
      ))}
    </div>
  );
}

function AppealCard({
  item,
  pending,
  onReview,
}: {
  item: PenaltyAppealItem;
  pending: boolean;
  onReview: (id: string, decision: 'approved' | 'rejected') => void;
}) {
  return (
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="font-medium">{item.userAlias}</span>
          <span className="ml-2 font-mono text-xs text-stone-600">{item.userPhone}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.penaltySeverity ? (
            <Pill tone="warn">{SEVERITY_LABEL[item.penaltySeverity]}</Pill>
          ) : null}
          <span className="text-admin-red font-mono text-sm">
            {Math.round(item.penaltyDelta)} điểm
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-stone-600">
        Bị trừ ngày {new Date(item.penaltyAt).toLocaleDateString('vi-VN')} · Khiếu nại lúc{' '}
        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
      </p>
      <p className="mt-3 rounded-md bg-stone-50 p-3 text-sm text-stone-800">{item.explanation}</p>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => onReview(item.id, 'rejected')}
          className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          Từ chối
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => onReview(item.id, 'approved')}
          className="border-admin-green-soft-border bg-admin-green-soft text-admin-green rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          Chấp nhận
        </button>
      </div>
    </div>
  );
}
