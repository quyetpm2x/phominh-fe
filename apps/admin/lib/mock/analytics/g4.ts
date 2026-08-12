import type { GTab } from './types';

export const G4: GTab = {
  id: 'G4',
  tab: 'G4 Giữ chân',
  name: 'Giữ chân người dùng',
  desc: 'Theo cohort, tách riêng từng khu — tín hiệu quyết định có mở khu thứ hai',
  blocks: [
    {
      kind: 'grid',
      title: 'Bảng cohort — toàn hệ thống',
      desc: 'Hàng là tuần đăng ký, cột là số ngày sau khi đăng ký',
      wide: true,
      action: 'Đặt tiêu chí mở khu mới',
      cols: ['D1', 'D7', 'D14', 'D30'],
      rows: [
        {
          l: 'Tuần 26 · 612 người',
          cells: [
            { v: '64%', p: 64 },
            { v: '49%', p: 49 },
            { v: '41%', p: 41 },
            { v: '33%', p: 33 },
          ],
        },
        {
          l: 'Tuần 27 · 688 người',
          cells: [
            { v: '66%', p: 66 },
            { v: '53%', p: 53 },
            { v: '44%', p: 44 },
            { v: '36%', p: 36 },
          ],
        },
        {
          l: 'Tuần 28 · 704 người',
          cells: [
            { v: '68%', p: 68 },
            { v: '57%', p: 57 },
            { v: '47%', p: 47 },
            { v: '39%', p: 39 },
          ],
        },
        {
          l: 'Tuần 29 · 731 người',
          cells: [
            { v: '69%', p: 69 },
            { v: '59%', p: 59 },
            { v: '49%', p: 49 },
            { v: '—', p: 0 },
          ],
        },
        {
          l: 'Tuần 30 · 802 người',
          cells: [
            { v: '70%', p: 70 },
            { v: '62%', p: 62 },
            { v: '—', p: 0 },
            { v: '—', p: 0 },
          ],
        },
        {
          l: 'Tuần 31 · 826 người',
          cells: [
            { v: '71%', p: 71 },
            { v: '64%', p: 64 },
            { v: '—', p: 0 },
            { v: '—', p: 0 },
          ],
        },
      ],
    },
    {
      kind: 'grid',
      title: 'Bến Nghé — khu mở đầu tiên',
      desc: 'Cohort theo tuần đăng ký',
      cols: ['D1', 'D7', 'D30'],
      rows: [
        {
          l: 'Tuần 28',
          cells: [
            { v: '72%', p: 72 },
            { v: '61%', p: 61 },
            { v: '46%', p: 46 },
          ],
        },
        {
          l: 'Tuần 29',
          cells: [
            { v: '73%', p: 73 },
            { v: '63%', p: 63 },
            { v: '48%', p: 48 },
          ],
        },
        {
          l: 'Tuần 30',
          cells: [
            { v: '74%', p: 74 },
            { v: '64%', p: 64 },
            { v: '—', p: 0 },
          ],
        },
      ],
    },
    {
      kind: 'grid',
      title: 'Thủ Đức — khu mới nhất',
      desc: 'Cohort theo tuần đăng ký',
      cols: ['D1', 'D7', 'D30'],
      rows: [
        {
          l: 'Tuần 30',
          cells: [
            { v: '41%', p: 41 },
            { v: '24%', p: 24 },
            { v: '—', p: 0 },
          ],
        },
        {
          l: 'Tuần 31',
          cells: [
            { v: '38%', p: 38 },
            { v: '22%', p: 22 },
            { v: '—', p: 0 },
          ],
        },
        {
          l: 'Tuần 32',
          cells: [
            { v: '36%', p: 36 },
            { v: '—', p: 0 },
            { v: '—', p: 0 },
          ],
        },
      ],
    },
    {
      kind: 'list',
      title: 'Tiêu chí mở khu vực tiếp theo',
      desc: 'Chốt trong chiến lược ra mắt — cả bốn điều kiện phải đạt',
      wide: true,
      action: 'Mở khu mới — E2',
      items: [
        {
          text: 'Retention D7 của khu gần nhất đạt tối thiểu 55%',
          status: 'Đạt — Tân Định 58%',
          tone: 'ok',
        },
        {
          text: 'Bài đăng mới/ngày ổn định trên 50 bài trong 14 ngày',
          status: 'Đạt — Tân Định 118 bài',
          tone: 'ok',
        },
        { text: 'Bắc Đẩu của khu trên 65%', status: 'Đạt — Tân Định 74%', tone: 'ok' },
        {
          text: 'Khu đang mở gần nhất không còn cần bài mồi thủ công',
          status: 'Chưa đạt — Thủ Đức vẫn cần E1',
          tone: 'bad',
        },
      ],
    },
  ],
};
