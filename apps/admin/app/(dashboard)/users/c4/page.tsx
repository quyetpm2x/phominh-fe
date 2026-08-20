'use client';

import Link from 'next/link';

import { Pill } from '@/components/pill';
import { useFraudSignals, type FraudSignal } from '@/hooks/useFraudSignals';

const TYPE_LABEL: Record<FraudSignal['type'], string> = {
  account_creation_burst: 'Tạo tài khoản dồn dập',
  duplicate_bank_account: 'Trùng tài khoản ngân hàng',
};

// Tín hiệu gian lận tổng hợp — C4 (tai-lieu-chuc-nang.md #94, bussiness §9.9: "cờ tham khảo, không
// tự động khoá — admin quyết định thủ công"). Bản mock gốc liệt kê 3 tín hiệu, 2 trong số đó KHÔNG
// làm được ở đây (ghi rõ bên dưới) vì hạ tầng chưa tồn tại — không bịa dữ liệu giả cho phần đó.
export default function UsersC4Page() {
  const { signals, error } = useFraudSignals();

  return (
    <>
      <div className="border-admin-amber-soft-border bg-admin-amber-soft text-admin-amber-text mb-4 rounded-lg border px-4 py-3 text-sm leading-relaxed">
        Chỉ là cờ tham khảo — hệ thống không tự động khoá tài khoản dựa trên các tín hiệu này. Bấm
        vào từng tài khoản để xem chi tiết trước khi quyết định.
        <br />
        <span className="font-medium">Chưa làm được 2 tín hiệu trong bản thiết kế gốc:</span>{' '}
        &quot;nhiều tài khoản cùng 1 thiết bị&quot; và &quot;IP trùng lặp giữa các tài khoản vote
        qua lại&quot; — app hiện không ghi Device ID hay IP theo từng tài khoản.
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <SignalList signals={signals} />
    </>
  );
}

function SignalList({ signals }: { signals: FraudSignal[] | null }) {
  if (signals === null) {
    return <div className="px-1 py-4 text-sm text-stone-600">Đang tải…</div>;
  }
  if (signals.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border px-5 py-8 text-center text-sm text-stone-600">
        Chưa phát hiện tín hiệu bất thường nào.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3.5">
      {signals.map((s, i) => (
        <SignalCard key={`${s.type}-${i}`} signal={s} />
      ))}
    </div>
  );
}

function SignalCard({ signal: s }: { signal: FraudSignal }) {
  const tone = s.type === 'duplicate_bank_account' ? 'bad' : 'warn';
  return (
    <div className="border-border bg-background rounded-lg border p-5">
      <div className="flex flex-wrap items-center gap-3">
        <Pill tone={tone}>{TYPE_LABEL[s.type]}</Pill>
        <span className="text-sm font-semibold">{s.summary}</span>
        <span className="flex-1" />
        <span className="text-xs text-stone-600">
          {new Date(s.detectedAt).toLocaleString('vi-VN')}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-700">{s.detail}</p>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {s.relatedUserIds.map((id) => (
          <Link
            key={id}
            href={`/users/c2?id=${id}`}
            className="border-border rounded-md border bg-stone-50 px-2.5 py-1.5 font-mono text-xs text-stone-700 no-underline hover:bg-stone-100"
          >
            {id.slice(0, 8)}…
          </Link>
        ))}
      </div>
    </div>
  );
}
