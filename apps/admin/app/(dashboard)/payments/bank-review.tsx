'use client';

import { useAdminBankAccounts, type AdminBankAccountItem } from '@/hooks/useAdminBankAccounts';

const BUTTON = 'rounded-md px-3 py-1.5 text-xs font-semibold disabled:opacity-40';

// Duyệt tài khoản ngân hàng user liên kết: đối chiếu số tài khoản và tên chủ tài khoản với ngân hàng rồi duyệt hoặc từ chối.
// Từ chối = xoá liên kết và báo user nhập lại. Mỗi lần xem số đầy đủ đều ghi nhật ký.
export function BankReview() {
  const { accounts, revealed, pendingId, error, act, reveal } = useAdminBankAccounts();
  if (accounts === null && !error) return null;
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-sm font-semibold">
        Tài khoản ngân hàng chờ duyệt ({accounts?.length ?? 0})
      </h2>
      {error ? <div className="text-admin-red mb-2 text-sm">{error}</div> : null}
      {accounts?.length ? (
        <div className="border-border bg-background overflow-hidden rounded-lg border">
          {accounts.map((account) => (
            <BankRow
              key={account.id}
              account={account}
              number={revealed[account.id]}
              busy={pendingId === account.id}
              onReveal={() => void reveal(account.id)}
              onVerify={() => void act(account.id, 'verify')}
              onReject={() => {
                if (
                  window.confirm(
                    `Từ chối tài khoản của ${account.userName}? User sẽ phải liên kết lại.`,
                  )
                ) {
                  void act(account.id, 'reject');
                }
              }}
            />
          ))}
        </div>
      ) : (
        <div className="border-border bg-background rounded-lg border p-5 text-center text-sm text-stone-600">
          Không có tài khoản nào đang chờ duyệt.
        </div>
      )}
    </section>
  );
}

function BankRow(props: {
  account: AdminBankAccountItem;
  number: string | undefined;
  busy: boolean;
  onReveal: () => void;
  onVerify: () => void;
  onReject: () => void;
}) {
  const { account } = props;
  return (
    <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b p-4 text-sm last:border-b-0">
      <div>
        <div className="font-semibold">
          {account.userName} · {account.userPhoneNumber}
        </div>
        <div className="text-xs text-stone-600">
          {account.bankCode} · {props.number ?? account.accountNumberMasked} ·{' '}
          {account.accountHolderName}
        </div>
      </div>
      <div className="flex gap-2">
        {props.number ? null : (
          <button
            type="button"
            onClick={props.onReveal}
            className={`${BUTTON} border border-stone-200`}
          >
            Xem số đầy đủ
          </button>
        )}
        <button
          type="button"
          disabled={props.busy}
          onClick={props.onReject}
          className={`${BUTTON} text-admin-red border border-stone-200`}
        >
          Từ chối
        </button>
        <button
          type="button"
          disabled={props.busy}
          onClick={props.onVerify}
          className={`${BUTTON} bg-stone-900 text-white`}
        >
          Duyệt
        </button>
      </div>
    </div>
  );
}
