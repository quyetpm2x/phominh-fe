import { cache } from 'react';

// Xem trước hồ sơ cho link chia sẻ /u/:id — gọi GET /api/public/users/:id phía server (như publicPost.ts).
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3000';

// Deep link mở hồ sơ trong app — route resident/[id] của app Expo, scheme "phominh" ở app.json.
export const APP_PROFILE_DEEP_LINK = (id: string) => `phominh://resident/${id}`;

export interface PublicProfile {
  id: string;
  name: string;
  avatarUrl: string | null;
  trustBadgeLabel: string;
  trusters: number;
  postCount: number;
}

// null = không tồn tại / tài khoản bị khoá hoặc đang xoá (backend trả 404) hoặc không gọi được backend.
export const getPublicProfile = cache(async (id: string): Promise<PublicProfile | null> => {
  try {
    const res = await fetch(`${BACKEND_API_URL}/api/public/users/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: PublicProfile };
    return body.data ?? null;
  } catch {
    return null;
  }
});
