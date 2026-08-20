'use client';

import { Pill } from '@/components/pill';
import { useEmergencyAdmin, type EmergencyPost } from '@/hooks/useEmergencyAdmin';

// Xác minh tin khẩn cấp — B5 (tai-lieu-chuc-nang.md #90). "Bác bỏ — tin giả" của bản mock gốc
// CHƯA làm — cần luồng report + trừng phạt ngược riêng cho tác giả, chưa có thiết kế/quyết định
// business cụ thể (khác hẳn 2 nút còn lại, chỉ đổi trạng thái bài).
export default function ReportsB5Page() {
  const { posts, error, pendingId, runAction } = useEmergencyAdmin();

  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}
      {posts === null ? (
        <div className="text-sm text-stone-600">Đang tải…</div>
      ) : posts.length === 0 ? (
        <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
          Chưa có bài đăng khẩn cấp nào.
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {posts.map((post) => (
            <EmergencyCard
              key={post.id}
              post={post}
              pending={pendingId === post.id}
              onVerify={() => void runAction(post.id, 'verify')}
              onResolve={() => void runAction(post.id, 'resolve')}
            />
          ))}
        </div>
      )}
    </>
  );
}

function emergencyStatus(post: EmergencyPost): { tone: 'ok' | 'neutral' | 'warn'; label: string } {
  if (post.resolvedAt) return { tone: 'ok', label: 'Đã giải quyết' };
  if (post.verifiedAt) return { tone: 'neutral', label: 'Đã xác minh' };
  return { tone: 'warn', label: 'Chờ xác minh' };
}

function EmergencyCard({
  post,
  pending,
  onVerify,
  onResolve,
}: {
  post: EmergencyPost;
  pending: boolean;
  onVerify: () => void;
  onResolve: () => void;
}) {
  const pct = Math.min(100, Math.round((post.confirmCount / post.threshold) * 100));
  const status = emergencyStatus(post);

  return (
    <div className="border-border bg-background flex items-start gap-5 rounded-lg border p-5">
      <div className="flex-1">
        <div className="flex items-center gap-2.5">
          <Pill tone={status.tone}>{status.label}</Pill>
          <span className="font-mono text-xs text-stone-500">
            {new Date(post.createdAt).toLocaleString('vi-VN')} · {post.authorAlias}
          </span>
        </div>
        <div className="mt-2.5 text-base font-semibold leading-snug">{post.content}</div>
        <div className="mt-3 flex items-center gap-2.5">
          <div className="bg-muted h-1.5 w-44 overflow-hidden rounded-full">
            <div className="bg-primary h-full" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-stone-700">
            {post.confirmCount}/{post.threshold} lượt xác nhận
          </span>
        </div>
      </div>
      <div className="flex w-48 flex-none flex-col gap-2">
        <button
          type="button"
          disabled={pending || !!post.verifiedAt}
          onClick={onVerify}
          className="h-9 rounded-md bg-stone-900 text-xs font-semibold text-white disabled:opacity-50"
        >
          {post.verifiedAt ? 'Đã xác minh' : 'Xác minh thủ công'}
        </button>
        <button
          type="button"
          disabled={pending || !!post.resolvedAt}
          onClick={onResolve}
          className="border-border h-9 rounded-md border text-xs font-medium disabled:opacity-50"
        >
          {post.resolvedAt ? 'Đã giải quyết' : 'Đánh dấu đã giải quyết'}
        </button>
      </div>
    </div>
  );
}
