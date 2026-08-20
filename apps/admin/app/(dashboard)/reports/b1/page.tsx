'use client';

import { ReportQueueView } from '@/components/report-queue-view';
import type { ReportItem } from '@/hooks/useReportQueue';

// Report bài đăng — B1 (tai-lieu-chuc-nang.md #86). "Xem EXIF" hiện luôn trống — exifCapturedAt
// chưa từng được ghi ở bất kỳ đâu trong hệ thống (chưa chọn thư viện đọc EXIF, xem
// ModerationService.checkExifMismatch) — hiện đúng trạng thái thật thay vì giả vờ có dữ liệu.
export default function ReportsB1Page() {
  return (
    <ReportQueueView
      endpoint="/api/admin/reports/posts"
      severeActionLabel="Gỡ bài"
      extraField="removePost"
      renderContent={(report) => ({ node: <PostContent report={report} />, canAct: true })}
    />
  );
}

function PostContent({ report }: { report: ReportItem }) {
  const post = report.post;
  if (!post) return <div className="text-sm text-stone-600">(Không tìm thấy bài đăng)</div>;

  return (
    <div className="flex gap-3.5">
      {post.images[0] ? (
        // eslint-disable-next-line @next/next/no-img-element -- ảnh từ Supabase Storage, domain động theo dự án
        <img
          src={post.images[0].url}
          alt=""
          className="h-20 w-20 flex-none rounded-lg object-cover"
        />
      ) : (
        <div className="h-20 w-20 flex-none rounded-lg bg-stone-100" />
      )}
      <div className="min-w-0 flex-1">
        <div className="text-sm leading-snug">{post.content}</div>
        <div className="mt-1 text-xs text-stone-600">
          Tác giả: {post.author.alias} · {new Date(post.createdAt).toLocaleString('vi-VN')}
          {post.status === 'removed' ? ' · Đã gỡ trước đó' : ''}
        </div>
        <div className="mt-2 rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-xs">
          <div className="mb-1 font-semibold uppercase tracking-wide text-stone-600">EXIF</div>
          {post.images.every((img) => !img.exifCapturedAt) ? (
            <div className="text-stone-500">
              Không có dữ liệu EXIF (tính năng đọc EXIF ảnh chưa triển khai)
            </div>
          ) : (
            post.images.map((img, i) => (
              <div key={img.url} className="text-stone-700">
                Ảnh {i + 1}: chụp lúc {new Date(img.exifCapturedAt!).toLocaleString('vi-VN')}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
