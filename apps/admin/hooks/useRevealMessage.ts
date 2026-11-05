import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

// Bắt buộc ghi lý do trước khi xem nội dung tin nhắn bị report (bussiness §9.9) — mỗi report giữ nội dung đã reveal riêng trong state cục bộ, KHÔNG
// cache lâu dài/không lưu localStorage (tránh lộ dữ liệu nhạy cảm ngoài ý muốn).
export function useRevealMessage() {
  const [revealed, setRevealed] = React.useState<Record<string, string>>({});
  const [error, setError] = React.useState<string | null>(null);
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function reveal(reportId: string, reason: string) {
    setPendingId(reportId);
    setError(null);
    try {
      const data = await adminFetch<{ content: string }>(
        `/api/admin/reports/${reportId}/reveal-message`,
        { method: 'POST', body: JSON.stringify({ reason }) },
      );
      setRevealed((prev) => ({ ...prev, [reportId]: data.content }));
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không mở được nội dung');
    } finally {
      setPendingId(null);
    }
  }

  return { revealed, error, pendingId, reveal };
}
