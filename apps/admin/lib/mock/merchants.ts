import type { Tone } from '../types';

// Ported từ merchants trong Admin.dc.html — dùng cho D1.
export interface MerchantRow {
  name: string;
  cat: string;
  area: string;
  posts: string;
  reveals: string;
  status: string;
  tone: Tone;
}

export const MERCHANTS: MerchantRow[] = [
  {
    name: 'Bún riêu Cô Bảy',
    cat: 'Ăn uống',
    area: 'Bình Thạnh',
    posts: '6',
    reveals: '148',
    status: 'Hoạt động',
    tone: 'ok',
  },
  {
    name: 'Tạp hóa Ba Đức',
    cat: 'Tạp hóa',
    area: 'Tân Định',
    posts: '4',
    reveals: '92',
    status: 'Hoạt động',
    tone: 'ok',
  },
  {
    name: 'Sửa xe Hùng',
    cat: 'Dịch vụ',
    area: 'Bến Nghé',
    posts: '2',
    reveals: '61',
    status: 'Hoạt động',
    tone: 'ok',
  },
  {
    name: 'Hoa tươi Mai Linh',
    cat: 'Bán lẻ',
    area: 'Bến Nghé',
    posts: '0',
    reveals: '3',
    status: 'Ngưng đăng 18 ngày',
    tone: 'warn',
  },
  {
    name: 'Giặt ủi 24h Thủ Đức',
    cat: 'Dịch vụ',
    area: 'Thủ Đức',
    posts: '9',
    reveals: '27',
    status: 'Chờ duyệt',
    tone: 'neutral',
  },
  {
    name: 'Điện máy Phát Lộc',
    cat: 'Bán lẻ',
    area: 'Thủ Đức',
    posts: '21',
    reveals: '14',
    status: 'Cờ đỏ D3',
    tone: 'bad',
  },
];
