import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface MarketingLead {
  id: string;
  type: string;
  payload: Record<string, string>;
  createdAt: string;
  handledAt: string | null;
}

// Đọc/xử lý bảng marketing_leads thật (không phải mock) — tách khỏi page.tsx để giữ component
// dưới 60 dòng (quy tắc lint max-lines-per-function của repo).
export function useMarketingLeads() {
  const router = useRouter();
  const [leads, setLeads] = React.useState<MarketingLead[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [typeFilter, setTypeFilter] = React.useState<string | undefined>(undefined);
  const [handledFilter, setHandledFilter] = React.useState<boolean | undefined>(false);
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams();
      if (typeFilter) params.set('type', typeFilter);
      if (handledFilter !== undefined) params.set('handled', String(handledFilter));
      const data = await adminFetch<MarketingLead[]>(
        `/api/admin/marketing-leads?${params.toString()}`,
      );
      setLeads(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [typeFilter, handledFilter, router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function toggleHandled(lead: MarketingLead) {
    setPendingId(lead.id);
    try {
      await adminFetch(`/api/admin/marketing-leads/${lead.id}/handled`, {
        method: 'PATCH',
        body: JSON.stringify({ handled: !lead.handledAt }),
      });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không cập nhật được');
    } finally {
      setPendingId(null);
    }
  }

  return {
    leads,
    error,
    typeFilter,
    setTypeFilter,
    handledFilter,
    setHandledFilter,
    pendingId,
    toggleHandled,
  };
}
