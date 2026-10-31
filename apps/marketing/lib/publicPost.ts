import { cache } from 'react';

// Xem trước bài cho link chia sẻ /p/:id — gọi GET /api/public/posts/:id phía server (cùng
// BACKEND_API_URL như backendApi.ts, không lộ ra client bundle).
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3000';

// Deep link mở bài trong app — scheme "phominh" khai báo ở app.json của app Expo.
export const APP_POST_DEEP_LINK = (id: string) => `phominh://post/${id}`;

export interface PublicPostImage {
  url: string;
  width: number | null;
  height: number | null;
}

export interface PublicPost {
  id: string;
  content: string;
  topic: string;
  images: PublicPostImage[];
  createdAt: string;
  authorName: string;
  addressText: string | null;
  likeCount: number;
  commentCount: number;
}

// null = bài không tồn tại/đã hết hạn/bị gỡ (backend trả 404) hoặc không gọi được backend.
// cache() để generateMetadata và trang dùng chung 1 lần gọi trong cùng request.
export const getPublicPost = cache(async (id: string): Promise<PublicPost | null> => {
  try {
    const res = await fetch(`${BACKEND_API_URL}/api/public/posts/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: PublicPost };
    return body.data ?? null;
  } catch {
    return null;
  }
});

// "26/10/2026 08:30" theo giờ Việt Nam — trang render phía server nên phải chốt múi giờ.
export function formatPostTime(iso: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
