'use client';

import { cn } from '@pho-minh/ui';

import { Pill } from '@/components/pill';
import { useMarketingLeads, type MarketingLead } from '@/hooks/useMarketingLeads';

const TYPE_LABEL: Record<string, string> = {
  merchant_signup: 'Đăng ký quán',
  pilot_area_signup: 'Chờ mở khu mới',
  contact: 'Liên hệ',
};

const TYPE_TABS = [
  { value: undefined, label: 'Tất cả' },
  { value: 'merchant_signup', label: 'Đăng ký quán' },
  { value: 'pilot_area_signup', label: 'Chờ mở khu mới' },
  { value: 'contact', label: 'Liên hệ' },
] as const;

const HANDLED_TABS = [
  { value: undefined, label: 'Tất cả' },
  { value: false, label: 'Chưa xử lý' },
  { value: true, label: 'Đã xử lý' },
] as const;

// Dữ liệu THẬT từ bảng marketing_leads (không phải mock — khác toàn bộ các trang khác trong app
// này) — 3 lead từ web marketing domain chính: đăng ký quán, chờ mở khu mới, liên hệ.
export default function MarketingLeadsPage() {
  const {
    leads,
    error,
    typeFilter,
    setTypeFilter,
    handledFilter,
    setHandledFilter,
    pendingId,
    toggleHandled,
  } = useMarketingLeads();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <TabGroup
          value={typeFilter}
          options={TYPE_TABS}
          onChange={setTypeFilter}
          getKey={(v) => v ?? 'all'}
        />
        <TabGroup
          value={handledFilter}
          options={HANDLED_TABS}
          onChange={setHandledFilter}
          getKey={String}
        />
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <LeadsList
        leads={leads}
        pendingId={pendingId}
        onToggle={(lead) => void toggleHandled(lead)}
      />
    </div>
  );
}

function LeadsList({
  leads,
  pendingId,
  onToggle,
}: {
  leads: MarketingLead[] | null;
  pendingId: string | null;
  onToggle: (lead: MarketingLead) => void;
}) {
  if (leads === null) return <div className="text-sm text-stone-600">Đang tải…</div>;
  if (leads.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
        Không có lead nào khớp bộ lọc.
      </div>
    );
  }
  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border">
      {leads.map((lead, i) => (
        <LeadRow
          key={lead.id}
          lead={lead}
          last={i === leads.length - 1}
          pending={pendingId === lead.id}
          onToggle={() => onToggle(lead)}
        />
      ))}
    </div>
  );
}

function TabGroup<T>({
  value,
  options,
  onChange,
  getKey,
}: {
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
  getKey: (v: T) => string;
}) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={getKey(opt.value)}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs',
            getKey(opt.value) === getKey(value)
              ? 'bg-stone-900 font-semibold text-white'
              : 'border border-stone-200 text-stone-700',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function LeadRow({
  lead,
  last,
  pending,
  onToggle,
}: {
  lead: MarketingLead;
  last: boolean;
  pending: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn('flex items-start gap-3.5 px-4 py-3.5', !last && 'border-b border-stone-100')}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Pill tone="neutral">{TYPE_LABEL[lead.type] ?? lead.type}</Pill>
          <span className="font-mono text-xs text-stone-500">
            {new Date(lead.createdAt).toLocaleString('vi-VN')}
          </span>
        </div>
        <LeadPayload type={lead.type} payload={lead.payload} />
      </div>
      <div className="flex flex-none flex-col items-end gap-1.5">
        {lead.handledAt ? <Pill tone="ok">Đã xử lý</Pill> : <Pill tone="warn">Chưa xử lý</Pill>}
        <button
          type="button"
          disabled={pending}
          onClick={onToggle}
          className="border-border rounded-md border bg-white px-2.5 py-1.5 text-xs font-medium disabled:opacity-50"
        >
          {lead.handledAt ? 'Bỏ đánh dấu' : 'Đánh dấu đã xử lý'}
        </button>
      </div>
    </div>
  );
}

function LeadPayload({ type, payload }: { type: string; payload: Record<string, string> }) {
  if (type === 'merchant_signup') {
    return (
      <div className="mt-1.5 text-sm leading-snug">
        <span className="font-semibold">{payload.businessName}</span> · {payload.phoneNumber} ·{' '}
        {payload.address}
      </div>
    );
  }
  if (type === 'pilot_area_signup') {
    return <div className="mt-1.5 text-sm leading-snug">{payload.phoneNumber}</div>;
  }
  if (type === 'contact') {
    return (
      <div className="mt-1.5 text-sm leading-snug">
        <span className="font-semibold">{payload.name}</span> · {payload.contact}
        <div className="mt-0.5 text-stone-600">{payload.message}</div>
      </div>
    );
  }
  return <div className="mt-1.5 text-sm text-stone-600">{JSON.stringify(payload)}</div>;
}
