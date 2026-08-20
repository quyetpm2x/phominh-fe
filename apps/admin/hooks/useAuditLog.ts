import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface AuditLogItem {
  id: string;
  adminName: string;
  adminEmail: string;
  dataType: string;
  targetId: string;
  reason: string | null;
  createdAt: string;
}

// Log truy cập dữ liệu nhạy cảm (tai-lieu-chuc-nang.md #105) — SensitiveDataAccessLog đã ghi thật
// từ mục 88 (reveal-private-comment) và mục 92 (reveal user detail), nay có route xem lại.
export function useAuditLog() {
  const router = useRouter();
  const [logs, setLogs] = React.useState<AuditLogItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [dataType, setDataType] = React.useState<string | undefined>(undefined);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const params = dataType ? `?dataType=${encodeURIComponent(dataType)}` : '';
      const data = await adminFetch<AuditLogItem[]>(`/api/admin/sensitive-access-log${params}`);
      setLogs(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [dataType, router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  return { logs, error, dataType, setDataType };
}
