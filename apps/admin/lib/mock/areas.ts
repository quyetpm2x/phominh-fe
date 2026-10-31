import type { Tone } from '../types';

// Ported từ areas trong Admin.dc.html — dùng cho E2.
export interface AreaStat {
  v: string;
  k: string;
}

export interface AreaCard {
  name: string;
  status: string;
  tone: Tone;
  since: string;
  radius: string;
  on: boolean;
  stats: AreaStat[];
}

export const AREAS: AreaCard[] = [
  {
    name: 'Phường Bến Nghé, Q.1',
    status: 'Đang chạy',
    tone: 'ok',
    since: '02/02/2026',
    radius: 'bán kính 800m',
    on: true,
    stats: [
      { v: '1.204', k: 'Người dùng' },
      { v: '162', k: 'Bài/ngày' },
      { v: '64%', k: 'Retention D7' },
    ],
  },
  {
    name: 'Phường Tân Định, Q.1',
    status: 'Đang chạy',
    tone: 'ok',
    since: '18/04/2026',
    radius: 'bán kính 800m',
    on: true,
    stats: [
      { v: '842', k: 'Người dùng' },
      { v: '118', k: 'Bài/ngày' },
      { v: '58%', k: 'Retention D7' },
    ],
  },
  {
    name: 'Phường 12, Q. Bình Thạnh',
    status: 'Đang chạy',
    tone: 'warn',
    since: '11/06/2026',
    radius: 'bán kính 1km',
    on: true,
    stats: [
      { v: '456', k: 'Người dùng' },
      { v: '74', k: 'Bài/ngày' },
      { v: '41%', k: 'Retention D7' },
    ],
  },
  {
    name: 'P. Hiệp Bình Chánh, Thủ Đức',
    status: 'Mới mở',
    tone: 'bad',
    since: '29/07/2026',
    radius: 'bán kính 1,2km',
    on: false,
    stats: [
      { v: '138', k: 'Người dùng' },
      { v: '32', k: 'Bài/ngày' },
      { v: '22%', k: 'Retention D7' },
    ],
  },
];
