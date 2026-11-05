'use client';

import Link from 'next/link';
import * as React from 'react';

import { ImageLightbox } from '@/components/image-lightbox';
import { Pill } from '@/components/pill';
import type { AdminCommentNode, AdminPostDetail } from '@/hooks/useAdminPosts';
import { displayName, initials, STATUS_LABEL, STATUS_TONE } from '@/lib/post-detail-labels';

export function PostDetailBody({
  detail,
  hidingCommentId,
  onHideComment,
}: {
  detail: AdminPostDetail;
  hidingCommentId: string | null;
  onHideComment: (commentId: string) => void;
}) {
  const [zoomedImage, setZoomedImage] = React.useState<string | null>(null);

  return (
    <>
      <PostAuthorHeader detail={detail} />
      <p className="mt-3.5 whitespace-pre-wrap text-sm leading-relaxed">{detail.content}</p>

      {detail.images.length > 0 && (
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          {detail.images.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setZoomedImage(img.url)}
              className="h-24 w-full overflow-hidden rounded-md ring-1 ring-inset ring-stone-200 transition hover:opacity-90"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ảnh từ Supabase Storage, domain động theo dự án */}
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoomedImage && <ImageLightbox src={zoomedImage} onClose={() => setZoomedImage(null)} />}

      <div className="mt-5 flex items-center gap-2 border-t border-stone-100 pt-3.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Bình luận
        </span>
        <span className="rounded-full bg-stone-100 px-1.5 py-0.5 text-xs text-stone-600">
          {detail.comments.length}
        </span>
      </div>
      {detail.comments.length === 0 ? (
        <div className="mt-2 text-sm text-stone-600">Chưa có bình luận nào.</div>
      ) : (
        <div className="mt-2.5 flex flex-col gap-3">
          {detail.comments.map((c) => (
            <CommentNodeView
              key={c.id}
              comment={c}
              hidingCommentId={hidingCommentId}
              onHide={onHideComment}
            />
          ))}
        </div>
      )}
    </>
  );
}

function PostAuthorHeader({ detail }: { detail: AdminPostDetail }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="bg-admin-green flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-semibold text-white">
          {initials(detail.authorName)}
        </span>
        <div>
          <Link
            href={`/users/c2?id=${detail.authorId}`}
            className="text-admin-green text-sm font-medium hover:underline"
          >
            {displayName(detail.authorName, detail.authorNickname)}
          </Link>
          <div className="mt-0.5 text-xs text-stone-500">
            {new Date(detail.createdAt).toLocaleString('vi-VN')}
          </div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-1.5">
        <Pill tone={STATUS_TONE[detail.status]}>{STATUS_LABEL[detail.status]}</Pill>
      </div>
    </div>
  );
}

function CommentNodeView({
  comment: c,
  hidingCommentId,
  onHide,
}: {
  comment: AdminCommentNode;
  hidingCommentId: string | null;
  onHide: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <CommentRow comment={c} hidingCommentId={hidingCommentId} onHide={onHide} />
      {c.replies.length > 0 && (
        <div className="ml-9 flex flex-col gap-2.5 border-l-2 border-stone-100 pl-3.5">
          {c.replies.map((r) => (
            <CommentRow key={r.id} comment={r} hidingCommentId={hidingCommentId} onHide={onHide} />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentRow({
  comment: c,
  hidingCommentId,
  onHide,
}: {
  comment: AdminCommentNode;
  hidingCommentId: string | null;
  onHide: (id: string) => void;
}) {
  return (
    <div className="flex gap-2.5">
      <span className="bg-muted flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold text-stone-700">
        {initials(displayName(c.authorRealName, null))}
      </span>
      <div className="border-border min-w-0 flex-1 rounded-lg border bg-stone-50 px-3 py-2 text-sm">
        <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
          <span className="font-medium text-stone-700">
            {displayName(c.authorRealName, c.authorNickname)}
          </span>
          <span>{new Date(c.createdAt).toLocaleString('vi-VN')}</span>
        </div>
        <p className="mt-1">{c.content}</p>
        <div className="mt-1.5 flex items-center justify-between">
          {c.isHidden ? <Pill tone="bad">Đã bị ẩn</Pill> : <span />}
          {!c.isHidden && (
            <button
              type="button"
              disabled={hidingCommentId === c.id}
              onClick={() => onHide(c.id)}
              className="text-admin-red text-xs font-medium hover:underline disabled:opacity-40"
            >
              Ẩn bình luận
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
