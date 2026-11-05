'use client';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';

interface ActionLogItem {
  id: string;
  action: string;
  targetType: string | null;
  targetId: string | null;
  metadata: { reason?: string } | null;
  createdAt: string;
  adminName: string;
  adminEmail: string;
}

// Nhật ký thao tác của admin (100 dòng mới nhất), chỉ đọc. Khác F3: F3 là việc XEM dữ liệu nhạy cảm, đây là việc THAY ĐỔI dữ liệu.
export default function ActionLogPage() {
  const { data, error } = useAdminResource<ActionLogItem[]>('/api/admin/action-log');
  return (
    <>
      <AdminError message={error} />
      {data?.length === 0 ? <p className="text-sm text-stone-600">Chưa có thao tác nào.</p> : null}
      {data?.length ? (
        <div className="border-border bg-background overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-5 py-2">Admin</th>
                <th className="px-5 py-2">Thao tác</th>
                <th className="px-5 py-2">Đối tượng</th>
                <th className="px-5 py-2">Lý do</th>
                <th className="px-5 py-2">Lúc</th>
              </tr>
            </thead>
            <tbody>
              {data.map((log) => (
                <tr key={log.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-5 py-2">{log.adminName}</td>
                  <td className="px-5 py-2 font-mono text-xs">{log.action}</td>
                  <td className="px-5 py-2 font-mono text-xs">
                    {log.targetType ? `${log.targetType} ` : ''}
                    {log.targetId?.slice(0, 8) ?? ''}
                  </td>
                  <td className="px-5 py-2">{log.metadata?.reason ?? '—'}</td>
                  <td className="px-5 py-2">{new Date(log.createdAt).toLocaleString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
