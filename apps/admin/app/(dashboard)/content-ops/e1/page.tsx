'use client';

import * as React from 'react';

import { SeedPostForm } from '@/components/seed-post-form';
import { usePilotAreas } from '@/hooks/usePilotAreas';
import { useSeedContent, type SeedPostItem } from '@/hooks/useSeedContent';

const POST_TYPE_LABEL: Record<SeedPostItem['postType'], string> = {
  life: 'Đời sống',
  merchant: 'Merchant',
  emergency: 'Khẩn cấp',
};

// Đăng bài mồi thủ công (tai-lieu-chuc-nang.md #100, ScreenId E1) — cho khu vực thí điểm (#101)
// chưa đủ user, feed sẽ trống nếu không có nội dung ban đầu.
export default function ContentOpsE1Page() {
  const { areas } = usePilotAreas();
  const { posts, error, creating, createSeedPost } = useSeedContent();

  return (
    <>
      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <SeedPostForm
        areas={areas}
        creating={creating}
        onSubmit={(input) => void createSeedPost(input)}
      />

      <div className="border-border bg-background mt-4 overflow-hidden rounded-lg border">
        <div className="border-b border-stone-100 px-5 py-3 text-sm font-semibold">
          Bài mồi đã đăng
        </div>
        <SeedPostList posts={posts} />
      </div>
    </>
  );
}

function SeedPostList({ posts }: { posts: SeedPostItem[] | null }) {
  if (posts === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (posts.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">Chưa đăng bài mồi nào.</div>
    );
  }
  return (
    <>
      {posts.map((p) => (
        <div key={p.id} className="border-stone-75 border-b px-5 py-3 text-sm last:border-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              {POST_TYPE_LABEL[p.postType]}
            </span>
            <span className="text-xs text-stone-500">
              {new Date(p.createdAt).toLocaleString('vi-VN')}
            </span>
          </div>
          <p className="mt-1 text-stone-800">{p.content}</p>
        </div>
      ))}
    </>
  );
}
