'use client';

import { cn } from '@pho-minh/ui';

import { useAuditLog, type AuditLogItem } from '@/hooks/useAuditLog';

const DATA_TYPE_TABS: { value: string | undefined; label: string }[] = [
  { value: undefined, label: 'Tất cả' },
  { value: 'private_message', label: 'Tin nhắn' },
  { value: 'user_detail', label: 'Chi tiết người dùng' },
];

// Log truy cập dữ liệu nhạy cảm (tai-lieu-chuc-nang.md #105) — audit trail chỉ đọc, không sửa/xoá
// được (đúng bản chất 1 audit log thật).
export default function LegalF3Page() {
  const { logs, error, dataType, setDataType } = useAuditLog();

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        {DATA_TYPE_TABS.map((tab) => (
          <button
            key={String(tab.value)}
            type="button"
            onClick={() => setDataType(tab.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs',
              tab.value === dataType
                ? 'bg-stone-900 font-semibold text-white'
                : 'border border-stone-200 text-stone-700',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-3">Admin</div>
          <div className="col-span-2">Loại dữ liệu</div>
          <div className="col-span-2">Đối tượng</div>
          <div className="col-span-3">Lý do</div>
          <div className="col-span-2">Thời điểm</div>
        </div>
        <LogListBody logs={logs} />
      </div>
    </>
  );
}

function LogListBody({ logs }: { logs: AuditLogItem[] | null }) {
  if (logs === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (logs.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">
        Chưa có log nào khớp bộ lọc.
      </div>
    );
  }
  return (
    <>
      {logs.map((log) => (
        <div
          key={log.id}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-3">
            <span className="block font-medium">{log.adminName}</span>
            <span className="block text-xs text-stone-600">{log.adminEmail}</span>
          </div>
          <div className="col-span-2 text-stone-700">{log.dataType}</div>
          <div className="col-span-2 truncate font-mono text-xs text-stone-600">{log.targetId}</div>
          <div className="col-span-3 text-stone-700">{log.reason ?? '—'}</div>
          <div className="col-span-2 text-xs text-stone-600">
            {new Date(log.createdAt).toLocaleString('vi-VN')}
          </div>
        </div>
      ))}
    </>
  );
}
