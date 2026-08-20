import type { AdminPostDetail, AdminPostListItem } from '@/hooks/useAdminPosts';
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

export const POST_TYPE_LABEL: Record<AdminPostListItem['postType'], string> = {
  life: 'Đời sống',
  merchant: 'Merchant',
  emergency: 'Khẩn cấp',
};

export function initials(alias: string): string {
  return alias.slice(0, 2).toUpperCase();
}

// "Tên chính (Biệt danh)" — realName là tuỳ chọn user tự đặt (null nếu chưa đặt), alias luôn có
// sẵn nên khi không có realName chỉ hiện mỗi alias, không để dấu ngoặc rỗng.
export function displayName(alias: string, realName: string | null): string {
  return realName ? `${realName} (${alias})` : alias;
}
