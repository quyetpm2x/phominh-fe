import type { RoleId, ScreenId } from './types';

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

export interface RoleDef {
  id: RoleId;
  name: string;
  full: string;
  job: string;
  people: number;
}

// Ported từ ROLES trong Admin.dc.html.
export const ROLES: RoleDef[] = [
  {
    id: 'owner',
    name: 'Chủ sở hữu',
    full: 'Chủ sở hữu (Owner)',
    job: 'Toàn quyền, cấp phát và thu hồi quyền của admin khác',
    people: 2,
  },
  {
    id: 'mod',
    name: 'Kiểm duyệt viên',
    full: 'Kiểm duyệt viên (Moderator)',
    job: 'Xử lý report, tin khẩn cấp, khóa tài khoản',
    people: 5,
  },
  {
    id: 'ops',
    name: 'Vận hành cộng đồng',
    full: 'Vận hành cộng đồng (Community Ops)',
    job: 'Cold-start, đăng bài mồi, mời tiểu thương',
    people: 3,
  },
];

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
  D1: '/merchants/d1',
  D2: '/merchants/d2',
  D3: '/merchants/d3',
  E1: '/content-ops/e1',
  E2: '/content-ops/e2',
  E3: '/content-ops/e3',
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
      { id: 'A1', name: 'Đăng nhập admin', href: HREF.A1 },
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
    ],
  },
];
