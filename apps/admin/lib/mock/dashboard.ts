import type { Tone } from '../types';

// Dữ liệu mock cho A2 — ported từ kpis/NSM/queues/areaHealth trong Admin.dc.html. Chưa có
// backend cho các chỉ số này (api-sync: không có endpoint được generate), giữ nguyên fidelity
// của mock cho tới khi có API thật.
export interface Kpi {
  label: string;
  value: string;
  delta: string;
}

export const KPIS: Kpi[] = [
  { label: 'User mới hôm nay', value: '118', delta: '+12% so với TB 7 ngày' },
  { label: 'Bài đăng mới hôm nay', value: '386', delta: '3 khu vực đang hoạt động' },
  { label: 'Report chờ xử lý', value: '43', delta: 'TB xử lý 2 giờ 10 phút' },
  { label: 'Merchant hoạt động', value: '76', delta: 'đã đăng ít nhất 1 bài trong 7 ngày' },
  { label: 'Cụm tấn công đang diễn ra', value: '2', delta: 'hệ thống đã tạm khóa bình luận' },
];

export const NSM = {
  value: 62,
  delta: '▲ 7 điểm so với kỳ trước',
  band: 'ngưỡng đỏ dưới 40% · vùng xanh từ 65%',
  series: [52, 55, 51, 58, 61, 57, 63, 60, 66, 64, 69, 67, 71, 62],
};

export interface QueueItem {
  id: string;
  name: string;
  count: string;
  age: string;
  tone: Tone;
  href: string;
}

export const QUEUES: QueueItem[] = [
  {
    id: 'B5',
    name: 'Tin khẩn cấp chờ xác minh',
    count: '5',
    age: 'cũ nhất 12 phút',
    tone: 'bad',
    href: '/reports/b5',
  },
  {
    id: 'B1',
    name: 'Report bài đăng',
    count: '24',
    age: 'cũ nhất 3 giờ',
    tone: 'warn',
    href: '/reports/b1',
  },
  {
    id: 'B2',
    name: 'Report bình luận',
    count: '11',
    age: 'cũ nhất 5 giờ',
    tone: 'neutral',
    href: '/reports/b2',
  },
  {
    id: 'B3',
    name: 'Bình luận riêng tư bị report',
    count: '3',
    age: 'cũ nhất 1 ngày',
    tone: 'neutral',
    href: '/reports/b3',
  },
  {
    id: 'D2',
    name: 'Nghi ngờ bán chuyên nghiệp',
    count: '4',
    age: 'cũ nhất 2 ngày',
    tone: 'neutral',
    href: '/merchants/d2',
  },
  {
    id: 'F2',
    name: 'Yêu cầu xóa dữ liệu',
    count: '2',
    age: 'hạn còn 9 ngày',
    tone: 'neutral',
    href: '/legal/f2',
  },
];

export interface AreaHealthRow {
  name: string;
  posts: string;
  empty: string;
  age: string;
  status: string;
  tone: Tone;
}

export const AREA_HEALTH: AreaHealthRow[] = [
  {
    name: 'Phường Bến Nghé, Q.1',
    posts: '162 bài',
    empty: '0%',
    age: '41 phút',
    status: 'Khỏe',
    tone: 'ok',
  },
  {
    name: 'Phường Tân Định, Q.1',
    posts: '118 bài',
    empty: '4%',
    age: '58 phút',
    status: 'Khỏe',
    tone: 'ok',
  },
  {
    name: 'Phường 12, Q. Bình Thạnh',
    posts: '74 bài',
    empty: '19%',
    age: '2 giờ 15 phút',
    status: 'Cần theo dõi',
    tone: 'warn',
  },
  {
    name: 'Phường Hiệp Bình Chánh, Thủ Đức',
    posts: '32 bài',
    empty: '41%',
    age: '6 giờ 02 phút',
    status: 'Cần bài mồi',
    tone: 'bad',
  },
];
