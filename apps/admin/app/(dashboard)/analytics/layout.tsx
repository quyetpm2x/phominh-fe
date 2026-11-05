import { Suspense } from 'react';

// Bộ lọc thống kê đọc từ URL (useSearchParams), Next.js bắt buộc bọc Suspense.
export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="text-sm text-stone-600">Đang tải…</div>}>
      {children}
    </Suspense>
  );
}
