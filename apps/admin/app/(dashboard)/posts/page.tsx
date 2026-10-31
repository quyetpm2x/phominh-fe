'use client';

import { useState } from 'react';

import { Pill } from '@/components/pill';
import { PostDetailModal } from '@/components/post-detail-modal';
import { useAdminPostsList, type AdminPostListItem } from '@/hooks/useAdminPosts';
import type { Tone } from '@/lib/types';

const STATUS_LABEL: Record<AdminPostListItem['status'], string> = {
  active: 'Đang hiện',
  removed: 'Đã gỡ',
  expired: 'Hết hạn',
};

const STATUS_TONE: Record<AdminPostListItem['status'], Tone> = {
  active: 'ok',
  removed: 'bad',
  expired: 'neutral',
};

const POST_TYPE_LABEL: Record<AdminPostListItem['postType'], string> = {
  life: 'Đời sống',
  emergency: 'Khẩn cấp',
};

// Quản lý bài đăng — ngoài phạm vi 117 mục gốc, bổ sung theo yêu cầu (tai-lieu-chuc-nang.md mục
// 120). Chỉ xem, sort mặc định theo thời gian đăng mới nhất. Thao tác ẩn/xoá bài đã có sẵn ở luồng
// report (B1), không lặp lại ở đây.
export default function PostsPage() {
  const { posts, total, page, pageSize, error, loading, goToPage } = useAdminPostsList();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-4">Nội dung</div>
          <div className="col-span-2">Tác giả</div>
          <div className="col-span-1">Loại</div>
          <div className="col-span-1">Trạng thái</div>
          <div className="col-span-1">Vote</div>
          <div className="col-span-1">B.luận</div>
          <div className="col-span-1">Ảnh</div>
          <div className="col-span-1">Đăng lúc</div>
        </div>
        <PostsListBody posts={posts} onSelect={setOpenPostId} />
      </div>

      {total > 0 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          total={total}
          loading={loading}
          onChange={(p) => void goToPage(p)}
        />
      )}

      {openPostId && <PostDetailModal postId={openPostId} onClose={() => setOpenPostId(null)} />}
    </>
  );
}

function PostsListBody({
  posts,
  onSelect,
}: {
  posts: AdminPostListItem[] | null;
  onSelect: (id: string) => void;
}) {
  if (posts === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (posts.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">Chưa có bài đăng nào.</div>
    );
  }
  return (
    <>
      {posts.map((p) => (
        <PostRow key={p.id} post={p} onSelect={onSelect} />
      ))}
    </>
  );
}

// Cả dòng là 1 nút mở modal chi tiết (PostDetailModal) — link sang trang tác giả (C2) đã có sẵn
// trong modal đó nên không lặp lại link lồng trong dòng ở đây (tránh <a> lồng trong <button>).
function PostRow({
  post: p,
  onSelect,
}: {
  post: AdminPostListItem;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(p.id)}
      className="border-stone-75 grid w-full grid-cols-12 items-center gap-2 border-b px-5 py-3 text-left text-sm last:border-0 hover:bg-stone-50"
    >
      <div className="col-span-4 min-w-0">
        <p className="truncate">{p.content || '(không có nội dung chữ)'}</p>
        {p.isSeeded && <span className="text-admin-amber-text text-xs">Bài mồi admin</span>}
      </div>
      <div className="col-span-2 min-w-0 text-xs">
        <span className="block truncate font-medium text-stone-700">{p.authorName}</span>
        <span className="block truncate text-stone-500">Biệt danh: {p.authorNickname ?? '—'}</span>
      </div>
      <div className="col-span-1 text-xs text-stone-700">{POST_TYPE_LABEL[p.postType]}</div>
      <div className="col-span-1">
        <Pill tone={STATUS_TONE[p.status]}>{STATUS_LABEL[p.status]}</Pill>
      </div>
      <div className="col-span-1 font-mono text-xs">{p.voteCount}</div>
      <div className="col-span-1 font-mono text-xs">{p.commentCount}</div>
      <div className="col-span-1 font-mono text-xs">{p.imageCount}</div>
      <div className="col-span-1 text-xs text-stone-600">
        {new Date(p.createdAt).toLocaleDateString('vi-VN')}
      </div>
    </button>
  );
}

function PaginationControls({
  page,
  totalPages,
  total,
  loading,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  loading: boolean;
  onChange: (page: number) => void;
}) {
  return (
    <div className="mt-3.5 flex items-center justify-between text-sm text-stone-600">
      <span>
        Trang {page}/{totalPages} — {total.toLocaleString('vi-VN')} bài đăng
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={loading || page <= 1}
          onClick={() => onChange(page - 1)}
          className="border-border rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-40"
        >
          Trước
        </button>
        <button
          type="button"
          disabled={loading || page >= totalPages}
          onClick={() => onChange(page + 1)}
          className="border-border rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-40"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
