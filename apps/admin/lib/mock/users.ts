import type { Tone } from '../types';

// Ported từ users trong Admin.dc.html — dùng cho C1.
export interface UserRow {
  ini: string;
  name: string;
  phone: string;
  rep: string;
  joined: string;
  violations: string;
  status: string;
  tone: Tone;
}

export const USERS: UserRow[] = [
  {
    ini: 'NA',
    name: 'Ngọc Anh',
    phone: '0906 ••• 214',
    rep: '182',
    joined: '12/03/2026',
    violations: 'Không',
    status: 'Hoạt động',
    tone: 'ok',
  },
  {
    ini: 'TH',
    name: 'Trần Đức Huy',
    phone: '0938 ••• 077',
    rep: '41',
    joined: '28/06/2026',
    violations: '2 lần',
    status: 'Cảnh cáo',
    tone: 'warn',
  },
  {
    ini: 'CB',
    name: 'Cô Bảy bún riêu',
    phone: '0972 ••• 559',
    rep: '304',
    joined: '02/02/2026',
    violations: 'Không',
    status: 'Hoạt động',
    tone: 'ok',
  },
  {
    ini: 'PL',
    name: 'Phạm Lan',
    phone: '0961 ••• 188',
    rep: '9',
    joined: '01/08/2026',
    violations: '1 lần',
    status: 'Nghi vấn',
    tone: 'bad',
  },
  {
    ini: 'MT',
    name: 'Minh Tú',
    phone: '0918 ••• 340',
    rep: '127',
    joined: '19/04/2026',
    violations: 'Không',
    status: 'Hoạt động',
    tone: 'ok',
  },
  {
    ini: 'DK',
    name: 'Đặng Khoa',
    phone: '0977 ••• 402',
    rep: '0',
    joined: '03/08/2026',
    violations: '3 lần',
    status: 'Đã khóa',
    tone: 'neutral',
  },
];

// Ported từ udTabs/ud trong Admin.dc.html — dùng cho C2. Mock gốc chỉ có 1 hồ sơ ví dụ tĩnh,
// không đổi theo dòng nào được bấm ở C1 — giữ nguyên giản lược đó ở đây.
export const USER_DETAIL_TABS = [
  'Bài đăng 14',
  'Bình luận 63',
  'Report đã nhận 2',
  'Report đã gửi 9',
  'Lịch sử vote 141',
];

export const USER_DETAIL = {
  ini: 'PL',
  name: 'Phạm Lan',
  phone: '0961 ••• 188',
  facts: [
    { k: 'Điểm uy tín', v: '9' },
    { k: 'Ngày tham gia', v: '01/08/2026' },
    { k: 'Khu vực', v: 'Bình Thạnh' },
    { k: 'Bài đăng', v: '14' },
    { k: 'Report đã gửi', v: '9' },
    { k: 'Report đã nhận', v: '2' },
    { k: 'Thiết bị', v: '3 tài khoản chung' },
    { k: 'Trong cụm vote', v: 'CL-042' },
  ],
  timeline: [
    {
      time: '06/08 04:12',
      kind: 'Vote',
      tone: 'neutral' as Tone,
      text: 'Vote uy tín cho Đặng Khoa — tài khoản trong cùng cụm CL-042',
    },
    {
      time: '06/08 03:58',
      kind: 'Report',
      tone: 'warn' as Tone,
      text: 'Gửi report bài "Mất chó Corgi màu vàng gần chợ Tân Định" — lý do ảnh không chụp trực tiếp',
    },
    {
      time: '05/08 22:31',
      kind: 'Bình luận',
      tone: 'neutral' as Tone,
      text: 'Bình luận riêng tư gửi chủ bài, đã bị report một lần trong tuần',
    },
    {
      time: '05/08 20:04',
      kind: 'Vote',
      tone: 'neutral' as Tone,
      text: 'Vote uy tín cho Trần Đức Huy — nhận vote ngược lại sau 6 phút',
    },
    {
      time: '04/08 19:22',
      kind: 'Bài đăng',
      tone: 'neutral' as Tone,
      text: 'Đăng "Thanh lý tủ lạnh mini còn bảo hành" — 3 bình luận',
    },
    {
      time: '03/08 11:07',
      kind: 'Vi phạm',
      tone: 'bad' as Tone,
      text: 'Bị cảnh cáo do đăng lại ảnh không phải chụp trực tiếp',
    },
    {
      time: '01/08 09:15',
      kind: 'Tài khoản',
      tone: 'neutral' as Tone,
      text: 'Tạo tài khoản, xác thực OTP thành công',
    },
  ],
};

// Ported từ clusters trong Admin.dc.html — dùng cho C3.
export interface FraudCluster {
  id: string;
  size: number;
  density: string;
  risk: string;
  tone: Tone;
  found: string;
  members: { name: string; votes: number }[];
  note: string;
}

export const CLUSTERS: FraudCluster[] = [
  {
    id: 'CL-042',
    size: 5,
    density: '0.87',
    risk: 'Rủi ro cao',
    tone: 'bad',
    found: '06/08/2026',
    members: [
      { name: 'Phạm Lan', votes: 141 },
      { name: 'Đặng Khoa', votes: 128 },
      { name: 'Vũ Hà', votes: 119 },
      { name: 'Lê Sơn', votes: 96 },
      { name: 'Ngô Thảo', votes: 88 },
    ],
    note: '5 tài khoản tạo trong cùng một tuần, 87% lượt vote của cả cụm hướng vào nhau. Ba tài khoản chia sẻ cùng một định danh thiết bị.',
  },
  {
    id: 'CL-039',
    size: 3,
    density: '0.61',
    risk: 'Cần xem thêm',
    tone: 'warn',
    found: '02/08/2026',
    members: [
      { name: 'Bùi Nam', votes: 74 },
      { name: 'Hoàng My', votes: 66 },
      { name: 'Trịnh Vũ', votes: 52 },
    ],
    note: 'Ba tài khoản cùng khu, vote qua lại đều đặn nhưng cũng có tương tác với người ngoài cụm. Có thể là hàng xóm quen biết thật.',
  },
  {
    id: 'CL-031',
    size: 4,
    density: '0.79',
    risk: 'Đã xử lý',
    tone: 'neutral',
    found: '21/07/2026',
    members: [
      { name: 'Tài khoản A', votes: 0 },
      { name: 'Tài khoản B', votes: 0 },
      { name: 'Tài khoản C', votes: 0 },
      { name: 'Tài khoản D', votes: 0 },
    ],
    note: 'Đã vô hiệu hóa điểm ảo ngày 22/07. Điểm uy tín của cả 4 tài khoản đưa về 0, không khóa tài khoản.',
  },
];
