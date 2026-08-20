import type { ScreenId } from './types';

export interface NavItem {
  id: ScreenId;
  name: string;
  href: string;
  badge?: number;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

const HREF: Record<ScreenId, string> = {
  A1: '/login',
  A2: '/',
  A3: '/admin-accounts',
  B1: '/reports/b1',
  B2: '/reports/b2',
  B3: '/reports/b3',
  B4: '/reports/b4',
  B5: '/reports/b5',
  C1: '/users/c1',
  C2: '/users/c2',
  C3: '/users/c3',
  C4: '/users/c4',
  C5: '/users/c5',
  C6: '/users/c6',
  D1: '/merchants/d1',
  D2: '/merchants/d2',
  D3: '/merchants/d3',
  E1: '/content-ops/e1',
  E2: '/content-ops/e2',
  E3: '/content-ops/e3',
  E4: '/content-ops/e4',
  F1: '/legal/f1',
  F2: '/legal/f2',
  F3: '/legal/f3',
  G1: '/analytics/g1',
  G2: '/analytics/g2',
  G3: '/analytics/g3',
  G4: '/analytics/g4',
  G5: '/analytics/g5',
  G6: '/analytics/g6',
  G7: '/analytics/g7',
  G8: '/analytics/g8',
  G9: '/user-activity',
  H1: '/marketing-leads',
  I1: '/payments',
  I2: '/leaderboard-snapshots',
  J1: '/posts',
};

export function screenHref(id: ScreenId): string {
  return HREF[id];
}

const PATH_TO_SCREEN = Object.fromEntries(
  (Object.entries(HREF) as [ScreenId, string][]).map(([id, href]) => [href, id]),
) as Record<string, ScreenId>;

export function screenIdForPath(pathname: string): ScreenId | undefined {
  return PATH_TO_SCREEN[pathname];
}

// Ported từ NAV trong Admin.dc.html.
export const NAV: NavGroup[] = [
  {
    label: 'A · Truy cập & Tổng quan',
    items: [
      { id: 'A2', name: 'Dashboard tổng quan', href: HREF.A2 },
      { id: 'A3', name: 'Vai trò & phân quyền', href: HREF.A3 },
    ],
  },
  {
    label: 'B · Report & Kiểm duyệt',
    items: [
      { id: 'B1', name: 'Report bài đăng', href: HREF.B1, badge: 24 },
      { id: 'B2', name: 'Report bình luận', href: HREF.B2, badge: 11 },
      { id: 'B3', name: 'Bình luận riêng tư bị report', href: HREF.B3, badge: 3 },
      { id: 'B4', name: 'Cụm tấn công tự động', href: HREF.B4, badge: 2 },
      { id: 'B5', name: 'Xác minh tin khẩn cấp', href: HREF.B5, badge: 5 },
    ],
  },
  {
    label: 'C · Người dùng & Uy tín',
    items: [
      { id: 'C1', name: 'Danh sách người dùng', href: HREF.C1 },
      { id: 'C2', name: 'Chi tiết người dùng', href: HREF.C2 },
      { id: 'C3', name: 'Thông đồng vote', href: HREF.C3 },
      { id: 'C4', name: 'Tín hiệu gian lận', href: HREF.C4 },
      { id: 'C5', name: 'Khóa/mở khóa tài khoản', href: HREF.C5 },
      { id: 'C6', name: 'Khiếu nại phạt oan', href: HREF.C6 },
    ],
  },
  {
    label: 'D · Merchant',
    items: [
      { id: 'D1', name: 'Danh sách merchant', href: HREF.D1 },
      { id: 'D2', name: 'Report bán chuyên nghiệp', href: HREF.D2, badge: 4 },
      { id: 'D3', name: 'Giám sát ẩn/hiện SĐT', href: HREF.D3 },
    ],
  },
  {
    label: 'E · Vận hành cộng đồng',
    items: [
      { id: 'E1', name: 'Đăng bài mồi thủ công', href: HREF.E1 },
      { id: 'E2', name: 'Quản lý khu vực thí điểm', href: HREF.E2 },
      { id: 'E3', name: 'Lớp dữ liệu chính thống', href: HREF.E3 },
      { id: 'E4', name: 'Quản lý cộng tác viên', href: HREF.E4 },
    ],
  },
  {
    label: 'F · Pháp lý & Tuân thủ',
    items: [
      { id: 'F1', name: 'Điều khoản & chính sách', href: HREF.F1 },
      { id: 'F2', name: 'Yêu cầu xóa dữ liệu', href: HREF.F2, badge: 2 },
      { id: 'F3', name: 'Log truy cập dữ liệu', href: HREF.F3 },
    ],
  },
  {
    label: 'G · Thống kê & Phân tích',
    items: [
      { id: 'G1', name: 'Tổng quan — Bắc Đẩu', href: HREF.G1 },
      { id: 'G2', name: 'Sức khỏe nội dung', href: HREF.G2 },
      { id: 'G3', name: 'Tăng trưởng & kích hoạt', href: HREF.G3 },
      { id: 'G4', name: 'Giữ chân người dùng', href: HREF.G4 },
      { id: 'G5', name: 'Tương tác nội dung', href: HREF.G5 },
      { id: 'G6', name: 'Merchant', href: HREF.G6 },
      { id: 'G7', name: 'An toàn & kiểm duyệt', href: HREF.G7 },
      { id: 'G8', name: 'Chi phí vận hành', href: HREF.G8 },
      { id: 'G9', name: 'Hoạt động người dùng', href: HREF.G9 },
    ],
  },
  {
    label: 'H · Marketing',
    items: [{ id: 'H1', name: 'Lead từ web marketing', href: HREF.H1 }],
  },
  {
    label: 'I · Thanh toán',
    items: [
      { id: 'I1', name: 'Duyệt chi hộ Momo/VNPay', href: HREF.I1 },
      { id: 'I2', name: 'Bảng xếp hạng thưởng', href: HREF.I2 },
    ],
  },
  {
    label: 'J · Nội dung',
    items: [{ id: 'J1', name: 'Quản lý bài đăng', href: HREF.J1 }],
  },
];
