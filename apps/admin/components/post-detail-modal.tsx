'use client';

import * as React from 'react';

import { PostDetailBody } from '@/components/post-detail-body';
import { useAdminPostDetail } from '@/hooks/useAdminPosts';
import { STATUS_LABEL } from '@/lib/post-detail-labels';

type HideTarget = { kind: 'post' } | { kind: 'comment'; commentId: string };

// Modal chi tiết 1 bài đăng — mở từ click 1 dòng trong bảng quản lý bài đăng (mục 120). Ảnh/bình
// luận là dữ liệu THẬT. Ẩn
// bài/bình luận đều bắt buộc ghi lý do trước khi gọi API (HidePostDto/HideCommentDto phía backend
// từ chối nếu thiếu — dialog ở đây chỉ là UX, backend mới là chốt chặn thật).
export function PostDetailModal({ postId, onClose }: { postId: string; onClose: () => void }) {
  const { detail, error, loading, hiding, hide, hidingCommentId, hideComment } =
    useAdminPostDetail(postId);
  const [hideTarget, setHideTarget] = React.useState<HideTarget | null>(null);

  async function confirmHide(reason: string) {
    if (!hideTarget) return;
    const ok =
      hideTarget.kind === 'post'
        ? await hide(reason)
        : await hideComment(hideTarget.commentId, reason);
    if (ok) setHideTarget(null);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4 py-8">
      <div className="border-border flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-white shadow-xl">
        <ModalHeader onClose={onClose} />

        <div className="overflow-y-auto px-5 py-4">
          {error && (
            <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-3.5 rounded-md border px-3 py-2 text-xs">
              {error}
            </div>
          )}
          {loading || !detail ? (
            <div className="py-10 text-center text-sm text-stone-600">Đang tải…</div>
          ) : (
            <PostDetailBody
              detail={detail}
              hidingCommentId={hidingCommentId}
              onHideComment={(commentId) => setHideTarget({ kind: 'comment', commentId })}
            />
          )}
        </div>

        {detail && (
          <ModalFooter status={detail.status} onHidePost={() => setHideTarget({ kind: 'post' })} />
        )}
      </div>

      {hideTarget && (
        <HideReasonDialog
          loading={hideTarget.kind === 'post' ? hiding : hidingCommentId === hideTarget.commentId}
          title={hideTarget.kind === 'post' ? 'Ẩn bài đăng?' : 'Ẩn bình luận?'}
          description={
            hideTarget.kind === 'post'
              ? 'Bài đăng sẽ không còn hiển thị với người dùng nào nữa.'
              : 'Bình luận và mọi reply trực tiếp của nó sẽ không còn hiển thị với ai.'
          }
          onConfirm={(reason) => void confirmHide(reason)}
          onCancel={() => setHideTarget(null)}
        />
      )}
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
      <div className="text-sm font-semibold">Chi tiết bài đăng</div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md px-2 py-1 text-xs text-stone-500 hover:bg-stone-100 hover:text-stone-800"
      >
        Đóng ✕
      </button>
    </div>
  );
}

function ModalFooter({
  status,
  onHidePost,
}: {
  status: keyof typeof STATUS_LABEL;
  onHidePost: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50 px-5 py-3.5">
      <span className="text-xs text-stone-600">
        Trạng thái: <span className="font-medium">{STATUS_LABEL[status]}</span>
      </span>
      <button
        type="button"
        disabled={status !== 'active'}
        onClick={onHidePost}
        className="border-admin-red-soft-border text-admin-red rounded-md border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-red-50 disabled:opacity-40"
      >
        Ẩn bài đăng
      </button>
    </div>
  );
}

function HideReasonDialog({
  title,
  description,
  loading,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  loading: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = React.useState('');
  const canSubmit = reason.trim().length >= 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="border-border w-full max-w-sm rounded-xl border bg-white p-5 shadow-xl">
        <div className="text-sm font-semibold">{title}</div>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{description}</p>

        <label className="mt-3.5 block text-xs font-medium text-stone-700">
          Lý do ẩn <span className="text-admin-red">*</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Bắt buộc — tối thiểu 5 ký tự, ví dụ: nội dung phản cảm/spam..."
            rows={3}
            className="border-border mt-1.5 w-full rounded-md border px-3 py-2 text-sm font-normal text-stone-900"
          />
        </label>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-stone-200 px-3 py-1.5 text-xs font-medium"
          >
            Huỷ
          </button>
          <button
            type="button"
            disabled={!canSubmit || loading}
            onClick={() => onConfirm(reason.trim())}
            className="bg-admin-red rounded-md px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
          >
            {loading ? 'Đang ẩn…' : 'Xác nhận ẩn'}
          </button>
        </div>
      </div>
    </div>
  );
}
