import { cn } from '@pho-minh/ui';

// 3 hành động dùng chung cho B1/B2/B6 — "Giữ" bác report; "Cảnh cáo"/"severeLabel" đều actioned, báo tác giả,
// không trừ điểm uy tín, khác nhau ở việc có gỡ bài/ẩn bình luận/thu hồi tin nhắn luôn hay không. `severeLabel`/`onSevere` optional — nút thứ 3 chỉ hiện
// khi hàng đợi có hành động gỡ/ẩn tương ứng ở backend.
export function ReportActionBar({
  severeLabel,
  pending,
  onDismiss,
  onWarn,
  onSevere,
}: {
  severeLabel?: string;
  pending: boolean;
  onDismiss: () => void;
  onWarn: () => void;
  onSevere?: () => void;
}) {
  return (
    <div className="border-stone-75 mt-3.5 flex flex-wrap items-center gap-2 border-t pt-3">
      <button
        type="button"
        disabled={pending}
        onClick={onDismiss}
        className={cn(
          'bg-primary text-primary-foreground h-9 rounded-md px-3 text-xs font-semibold disabled:opacity-50',
        )}
      >
        Giữ — bác report
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={onWarn}
        className="border-border h-9 rounded-md border px-3 text-xs font-medium disabled:opacity-50"
      >
        Cảnh cáo
      </button>
      {onSevere && severeLabel ? (
        <button
          type="button"
          disabled={pending}
          onClick={onSevere}
          className="bg-admin-red h-9 rounded-md px-3 text-xs font-semibold text-white disabled:opacity-50"
        >
          {severeLabel}
        </button>
      ) : null}
    </div>
  );
}
