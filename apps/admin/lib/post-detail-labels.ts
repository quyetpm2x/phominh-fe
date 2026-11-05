import type { AdminPostDetail } from '@/hooks/useAdminPosts';
import type { Tone } from '@/lib/types';

export const STATUS_LABEL: Record<AdminPostDetail['status'], string> = {
  active: 'Đang hiện',
  removed: 'Đã gỡ',
  expired: 'Hết hạn',
};

export const STATUS_TONE: Record<AdminPostDetail['status'], Tone> = {
  active: 'ok',
  removed: 'bad',
  expired: 'neutral',
};

export function initials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

// Tên dự phòng khớp backend (REAL_NAME_FALLBACK) cho user cũ chưa điền tên thật.
const REAL_NAME_FALLBACK = 'Cư dân Phố Mình';

// "Tên thật (biệt danh: X)" — admin thấy cả 2 để đối chiếu bài/bình luận ẩn danh khi kiểm duyệt.
// Biệt danh chỉ có khi user tự đặt (null nếu chưa đặt) — khi đó chỉ hiện tên thật, không để ngoặc rỗng.
export function displayName(realName: string | null, nickname: string | null): string {
  const name = realName?.trim() || REAL_NAME_FALLBACK;
  return nickname ? `${name} (biệt danh: ${nickname})` : name;
}
