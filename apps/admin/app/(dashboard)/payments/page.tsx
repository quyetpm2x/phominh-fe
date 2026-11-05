'use client';

import { cn } from '@pho-minh/ui';

import { BankReview } from './bank-review';

import { Pill } from '@/components/pill';
import { useAdminPayouts, type AdminPayoutItem, type PayoutStatus } from '@/hooks/useAdminPayouts';
import type { Tone } from '@/lib/types';

const STATUS_TABS: { value: PayoutStatus | undefined; label: string }[] = [
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'success', label: 'Thành công' },
  { value: 'failed', label: 'Thất bại' },
  { value: undefined, label: 'Tất cả' },
];

const STATUS_LABEL: Record<PayoutStatus, string> = {
  pending: 'Chờ duyệt',
  processing: 'Đang xử lý',
  success: 'Thành công',
  failed: 'Thất bại',
};

const STATUS_TONE: Record<PayoutStatus, Tone> = {
  pending: 'warn',
  processing: 'neutral',
  success: 'ok',
  failed: 'bad',
};

const SOURCE_LABEL: Record<AdminPayoutItem['source'], string> = {
  leaderboard: 'Xếp hạng thưởng',
  referral: 'Giới thiệu',
};

// Hàng đợi duyệt chi hộ Momo/VNPay (tai-lieu-chuc-nang.md #115) — trước đây trang này chỉ là
// <h1>Thanh toán</h1> trống, không có route liệt kê nào ở backend nên yêu cầu rút tiền của user
// (mục 59, mobile) đứng yên vô thời hạn vì admin không có cách nào thấy để duyệt.
export default function PaymentsPage() {
  const { payouts, error, statusFilter, setStatusFilter, pendingId, processPayout } =
    useAdminPayouts();

  return (
    <div>
      <BankReview />
      <StatusTabs value={statusFilter} onChange={setStatusFilter} />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <PayoutsList payouts={payouts} pendingId={pendingId} onProcess={processPayout} />
    </div>
  );
}

function StatusTabs({
  value,
  onChange,
}: {
  value: PayoutStatus | undefined;
  onChange: (v: PayoutStatus | undefined) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {STATUS_TABS.map((tab) => (
        <button
          key={String(tab.value)}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs',
            tab.value === value
              ? 'bg-stone-900 font-semibold text-white'
              : 'border border-stone-200 text-stone-700',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function PayoutsList({
  payouts,
  pendingId,
  onProcess,
}: {
  payouts: AdminPayoutItem[] | null;
  pendingId: string | null;
  onProcess: (id: string) => void;
}) {
  if (payouts === null) return <div className="text-sm text-stone-600">Đang tải…</div>;
  if (payouts.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
        Không có yêu cầu chi hộ nào khớp bộ lọc.
      </div>
    );
  }
  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border">
      {payouts.map((p, i) => (
        <PayoutRow
          key={p.id}
          payout={p}
          last={i === payouts.length - 1}
          pending={pendingId === p.id}
          onProcess={() => onProcess(p.id)}
        />
      ))}
    </div>
  );
}

function actionLabelFor(status: PayoutStatus, pending: boolean): string {
  if (pending) return 'Đang gọi…';
  if (status === 'failed') return 'Thử duyệt lại';
  return 'Duyệt & chi';
}

function PayoutRow({
  payout,
  last,
  pending,
  onProcess,
}: {
  payout: AdminPayoutItem;
  last: boolean;
  pending: boolean;
  onProcess: () => void;
}) {
  const canProcess = payout.status === 'pending' || payout.status === 'failed';
  const actionLabel = actionLabelFor(payout.status, pending);
  return (
    <div
      className={cn('flex items-start gap-3.5 px-4 py-3.5', !last && 'border-b border-stone-100')}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={STATUS_TONE[payout.status]}>{STATUS_LABEL[payout.status]}</Pill>
          {payout.requiresManualApproval ? (
            <Pill tone="bad">Bắt buộc soát kỹ — lần đầu/vượt 2 triệu</Pill>
          ) : null}
          <span className="font-mono text-xs text-stone-500">
            {new Date(payout.createdAt).toLocaleString('vi-VN')}
          </span>
        </div>
        <div className="mt-1.5 text-sm leading-snug">
          <span className="font-semibold">{payout.amount.toLocaleString('vi-VN')}₫</span> ·{' '}
          {payout.userName} ({payout.userPhoneNumber}) · {SOURCE_LABEL[payout.source]}
        </div>
        <div className="mt-0.5 text-xs text-stone-600">
          Nhận vào {payout.bankCode} · {payout.accountHolderName}
          {payout.providerTransactionId ? ` · GD ${payout.providerTransactionId}` : ''}
        </div>
      </div>
      {canProcess ? (
        <button
          type="button"
          disabled={pending}
          onClick={onProcess}
          className="border-border flex-none rounded-md border bg-white px-2.5 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
