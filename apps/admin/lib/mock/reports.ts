import type { Tone } from '../types';

// Ported từ reportTabs/reports/sel trong Admin.dc.html — dùng cho B1.
export const REPORT_TABS = ['Chờ xử lý 24', 'Đã xử lý', 'Đã gỡ', 'Bác report'];

export interface ReportRow {
  title: string;
  meta: string;
  reason: string;
  tone: Tone;
  time: string;
}

export const REPORTS: ReportRow[] = [
  {
    title: 'Mất chó Corgi màu vàng gần chợ Tân Định',
    meta: 'Ngọc Anh · 0906 ••• 214 · Tân Định · 3 lượt report',
    reason: 'Ảnh không phải chụp trực tiếp',
    tone: 'warn',
    time: '03:12',
  },
  {
    title: 'Bán căn hộ 2PN view sông, liên hệ zalo',
    meta: 'Trần Đức Huy · 0938 ••• 077 · Bến Nghé · 6 lượt report',
    reason: 'Bán chuyên nghiệp',
    tone: 'neutral',
    time: '02:41',
  },
  {
    title: 'Quán bún riêu đầu hẻm 24 nghỉ bán hôm nay',
    meta: 'Cô Bảy · 0972 ••• 559 · Bình Thạnh · 1 lượt report',
    reason: 'Sai sự thật',
    tone: 'neutral',
    time: '01:55',
  },
  {
    title: 'Nhóm thanh niên gây rối trước số 118',
    meta: 'Ẩn danh · 0903 ••• 812 · Tân Định · 9 lượt report',
    reason: 'Xúc phạm cá nhân',
    tone: 'bad',
    time: '01:20',
  },
  {
    title: 'Cho tặng bộ bàn ghế gỗ còn tốt',
    meta: 'Minh Tú · 0918 ••• 340 · Thủ Đức · 2 lượt report',
    reason: 'Ảnh lấy trên mạng',
    tone: 'warn',
    time: '00:47',
  },
];

export const SELECTED_REPORT = {
  title: 'Mất chó Corgi màu vàng gần chợ Tân Định',
  body: 'Chó nhà mình sổng ra từ tối qua, ai thấy báo giúp mình với. Có đeo vòng cổ đỏ.',
  exif: [
    { k: 'Thời gian chụp', v: '05/08/2026 21:40' },
    { k: 'Thời gian đăng', v: '06/08/2026 03:12' },
    { k: 'Thiết bị', v: 'iPhone 13' },
    { k: 'Toạ độ ảnh', v: '10.7912, 106.6903' },
    { k: 'Chỉnh sửa', v: 'Không phát hiện' },
  ],
  verdict:
    'Ảnh chụp cách lúc đăng 5 giờ 32 phút, vẫn trong ngưỡng cho phép. Toạ độ ảnh khớp với vị trí đăng bài. Không có dấu hiệu lấy ảnh từ nguồn khác.',
};

// Ported từ emergencies trong Admin.dc.html — dùng cho B5.
export interface EmergencyRow {
  kind: string;
  tone: Tone;
  time: string;
  area: string;
  title: string;
  body: string;
  confirm: string;
  pct: number;
}

export const EMERGENCIES: EmergencyRow[] = [
  {
    kind: 'Tai nạn giao thông',
    tone: 'bad',
    time: '12 phút trước',
    area: 'Tân Định',
    title: 'Va chạm xe máy và taxi tại ngã tư Hai Bà Trưng — Trần Quang Khải',
    body: 'Hai người bị thương nhẹ, giao thông ùn ứ hướng về cầu Kiệu. Ba báo cáo độc lập trong bán kính 300m.',
    confirm: '3/4 xác nhận trùng khớp',
    pct: 75,
  },
  {
    kind: 'An ninh',
    tone: 'bad',
    time: '34 phút trước',
    area: 'Bình Thạnh',
    title: 'Nhóm người lạ dò cửa nhà dân khu hẻm 158',
    body: 'Hai báo cáo từ hai tài khoản khác nhau, cách nhau 90 mét. Một tài khoản mới tạo 2 ngày, trọng số xác nhận thấp.',
    confirm: '2/4 xác nhận trùng khớp',
    pct: 50,
  },
  {
    kind: 'Ngập nước',
    tone: 'warn',
    time: '1 giờ 12 phút trước',
    area: 'Thủ Đức',
    title: 'Ngập sâu đoạn Phạm Văn Đồng gần cầu Bình Lợi',
    body: 'Đã đủ xác nhận và đang hiển thị rộng. Chờ admin đánh dấu đã giải quyết khi nước rút.',
    confirm: '5/4 — đang hiển thị rộng',
    pct: 100,
  },
];
