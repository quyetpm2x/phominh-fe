import type { GTab } from './types';

export const G5: GTab = {
  id: 'G5',
  tab: 'G5 Tương tác',
  name: 'Tương tác nội dung',
  desc: 'Đo mức độ hoạt động thật của bình luận và hệ thống vote',
  blocks: [
    {
      kind: 'donut',
      title: 'Tỷ lệ bài có ít nhất 1 bình luận',
      desc: 'Bài không ai trả lời là bài không tạo được cảm giác hàng xóm',
      center: '62%',
      centerNote: 'có bình luận',
      segs: [
        { l: 'Có bình luận', v: '62%', pct: 62, tone: 'ok' },
        { l: 'Không ai bình luận', v: '38%', pct: 38, tone: 'neu' },
      ],
    },
    {
      kind: 'line',
      title: 'Số vote uy tín trung bình/bài',
      desc: 'Xu hướng theo tuần',
      fmt: (v) => v.toFixed(1).replace('.', ','),
      data: [
        { l: 'T26', v: 2.6 },
        { l: 'T27', v: 2.9 },
        { l: 'T28', v: 3.1 },
        { l: 'T29', v: 3.0 },
        { l: 'T30', v: 3.3 },
        { l: 'T31', v: 3.4, fmt: '3,4' },
      ],
    },
    {
      kind: 'gauge',
      title: 'Tỷ lệ bình luận riêng tư / công khai',
      desc: 'Theo dõi xem tính năng chỉ chủ bài thấy có bị lạm dụng thành kênh chat trá hình không',
      pct: 60,
      tone: 'ok',
      value: '18%',
      sub: 'riêng tư trên tổng bình luận',
      target: 'Ngưỡng cảnh báo tự động: 30%',
      action: 'Chỉnh ngưỡng',
      foot: 'Trong ngưỡng. Riêng bài merchant tỷ lệ riêng tư là 34% — hợp lý vì người mua hỏi giá.',
    },
    {
      kind: 'table',
      title: 'Cảnh báo tài khoản bất thường',
      desc: 'Trên 80% bình luận là riêng tư trong 7 ngày — dấu hiệu dùng app như kênh chat',
      action: 'Mở hồ sơ — C2',
      cols: ['Tài khoản', 'Tỷ lệ riêng tư', 'Số bình luận'],
      rows: [
        [{ v: 'Phạm Lan · 0961 ••• 188', bold: true }, { v: '94%', tone: 'bad' }, '61'],
        [{ v: 'Đặng Khoa · 0977 ••• 402', bold: true }, { v: '88%', tone: 'bad' }, '43'],
        [{ v: 'Vũ Hà · 0935 ••• 720', bold: true }, { v: '81%', tone: 'warn' }, '29'],
      ],
    },
  ],
};
