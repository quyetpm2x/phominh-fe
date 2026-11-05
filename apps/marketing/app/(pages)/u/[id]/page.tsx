import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BRAND } from '../../../../lib/constants';
import { APP_PROFILE_DEEP_LINK, getPublicProfile } from '../../../../lib/publicProfile';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Thẻ OpenGraph để Zalo/Messenger hiện xem trước khi dán link. Không cho công cụ tìm kiếm lập chỉ mục: tên thật cư dân.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getPublicProfile(id);
  if (!profile) return { title: 'Không tìm thấy cư dân', robots: { index: false } };

  const title = `${profile.name} trên ${BRAND}`;
  const description = `${profile.trustBadgeLabel} · ${profile.trusters.toLocaleString('vi-VN')} người tin tưởng`;
  return {
    title,
    description,
    robots: { index: false },
    openGraph: {
      type: 'profile',
      title,
      description,
      siteName: BRAND,
      locale: 'vi_VN',
      images: profile.avatarUrl ? [{ url: profile.avatarUrl }] : undefined,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function SharedProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = await getPublicProfile(id);
  if (!profile) notFound();

  return (
    <main className="mx-auto max-w-[620px] px-4 pb-[90px] pt-12 sm:px-6">
      <div className="text-accent-text font-mono text-[11px] tracking-[0.06em]">
        HỒ SƠ ĐƯỢC CHIA SẺ
      </div>

      <div className="border-border mt-5 flex items-center gap-4 rounded-2xl border bg-white p-5">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- ảnh từ kho người dùng, không qua tối ưu ảnh Next
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-16 w-16 flex-none rounded-full object-cover"
          />
        ) : (
          <div className="bg-primary flex h-16 w-16 flex-none items-center justify-center rounded-full text-2xl font-bold text-white">
            {profile.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold leading-[1.25] tracking-[-0.01em]">
            {profile.name}
          </h1>
          <p className="mt-0.5 text-[14px] text-gray-600">{profile.trustBadgeLabel}</p>
          <p className="mt-1 text-[14px] text-gray-800">
            <strong>{profile.trusters.toLocaleString('vi-VN')}</strong> người tin tưởng ·{' '}
            <strong>{profile.postCount.toLocaleString('vi-VN')}</strong> tin đã đăng
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={APP_PROFILE_DEEP_LINK(profile.id)}
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
        Xem tin đã đăng và nhắn tin cho hàng xóm ngay trong app.
      </p>
    </main>
  );
}
