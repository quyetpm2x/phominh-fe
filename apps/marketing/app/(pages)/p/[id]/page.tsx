import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PostPreviewCard } from '../../../../components/PostPreviewCard';
import { BRAND } from '../../../../lib/constants';
import { APP_POST_DEEP_LINK, getPublicPost } from '../../../../lib/publicPost';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Thẻ OpenGraph cho Zalo/Messenger/Facebook hiện xem trước đẹp khi dán link chia sẻ.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublicPost(id);
  if (!post) return { title: 'Không tìm thấy bài viết', robots: { index: false } };

  const title = `${post.authorName} trên ${BRAND}`;
  const description = post.content.length > 160 ? `${post.content.slice(0, 159)}…` : post.content;
  const image = post.images[0];
  return {
    title,
    description,
    robots: { index: false },
    openGraph: {
      type: 'article',
      title,
      description,
      siteName: BRAND,
      locale: 'vi_VN',
      images: image
        ? [{ url: image.url, width: image.width ?? undefined, height: image.height ?? undefined }]
        : undefined,
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description },
  };
}

export default async function SharedPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPublicPost(id);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[620px] px-4 pb-[90px] pt-12 sm:px-6">
      <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">
        BÀI VIẾT ĐƯỢC CHIA SẺ
      </div>
      <h1 className="mt-3 text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">
        Chuyện quanh khu phố trên {BRAND}
      </h1>

      <div className="mt-6">
        <PostPreviewCard post={post} />
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={APP_POST_DEEP_LINK(post.id)}
          className="from-primary rounded-2xl bg-gradient-to-br to-[#1A4794] px-6 py-3.5 text-center text-base font-bold text-white no-underline shadow-[0_10px_24px_rgba(45,108,223,.25)]"
        >
          Mở trong app {BRAND}
        </a>
        <Link
          href="/"
          className="border-border rounded-2xl border bg-white px-6 py-3.5 text-center text-base font-semibold text-gray-900 no-underline"
        >
          Chưa có app? Tìm hiểu {BRAND}
        </Link>
      </div>
      <p className="mt-3 text-[13px] leading-[1.6] text-gray-600">
        Xem đầy đủ bình luận và trò chuyện với hàng xóm ngay trong app.
      </p>
    </main>
  );
}
