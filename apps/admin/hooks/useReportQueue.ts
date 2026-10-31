import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export type ReportStatus = 'pending' | 'reviewed' | 'actioned' | 'dismissed';
export type Severity = 'light' | 'medium' | 'severe';

export interface ReportPost {
  id: string;
  content: string;
  status: string;
  createdAt: string;
  author: { realName: string | null; nickname: string | null };
  images: { url: string; exifCapturedAt: string | null }[];
}

export interface ReportComment {
  id: string;
  content?: string; // absent ở hàng đợi riêng tư cho tới khi reveal (mục 88)
  isHidden: boolean;
  createdAt: string;
  author: { realName: string | null; nickname: string | null };
}

export interface ReportItem {
  id: string;
  reason: string;
  description: string | null;
  status: ReportStatus;
  createdAt: string;
  post?: ReportPost;
  comment?: ReportComment;
}

export interface UpdateStatusInput {
  status: ReportStatus;
  severity?: Severity;
  removePost?: boolean;
  hideComment?: boolean;
}

// Dùng chung cho 3 hàng đợi report (B1/B2/B3, tai-lieu-chuc-nang.md #86-88) — chỉ khác endpoint
// nguồn, cùng 1 endpoint cập nhật trạng thái (PATCH admin/reports/:id/status).
export function useReportQueue(endpoint: string) {
  const router = useRouter();
  const [reports, setReports] = React.useState<ReportItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<ReportStatus | undefined>('pending');
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const data = await adminFetch<ReportItem[]>(`${endpoint}${params}`);
      setReports(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [endpoint, statusFilter, router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(reportId: string, input: UpdateStatusInput) {
    setPendingId(reportId);
    try {
      await adminFetch(`/api/admin/reports/${reportId}/status`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không cập nhật được');
    } finally {
      setPendingId(null);
    }
  }

  return { reports, error, statusFilter, setStatusFilter, pendingId, updateStatus, reload: load };
}
