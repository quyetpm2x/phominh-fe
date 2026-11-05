import type { ScreenId } from './types';

export interface NavItem {
  id: ScreenId;
  name: string;
  href: string;
  // Tính năng chưa chạy: menu ghi rõ để admin không tưởng trang bị lỗi.
  notEnabled?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

const HREF: Record<ScreenId, string> = {
  A1: '/login',
  A2: '/',
  A3: '/admin-accounts',
  A4: '/admin-accounts/action-log',
  A5: '/system-config',
  A6: '/broadcast',
  A7: '/admin-accounts/security',
  B1: '/reports/b1',
  B2: '/reports/b2',
  B4: '/reports/b4',
  B6: '/reports/b6',
  C1: '/users/c1',
  C2: '/users/c2',
  C3: '/users/c3',
  C4: '/users/c4',
  C5: '/users/c5',
  C7: '/users/c7',
  C8: '/users/c8',
  C9: '/users/c9',
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
  G7: '/analytics/g7',
  G8: '/analytics/g8',
  G9: '/user-activity',
  G10: '/analytics/product',
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
      { id: 'A4', name: 'Nhật ký thao tác', href: HREF.A4 },
      { id: 'A5', name: 'Cấu hình hệ thống', href: HREF.A5 },
      { id: 'A6', name: 'Thông báo hàng loạt', href: HREF.A6 },
      { id: 'A7', name: 'Bảo mật tài khoản', href: HREF.A7 },
    ],
  },
  {
    label: 'B · Report & Kiểm duyệt',
    items: [
      { id: 'B1', name: 'Report bài đăng', href: HREF.B1 },
      { id: 'B2', name: 'Report bình luận', href: HREF.B2 },
      { id: 'B4', name: 'Cụm tấn công tự động', href: HREF.B4, notEnabled: true },
      { id: 'B6', name: 'Report tin nhắn', href: HREF.B6 },
    ],
  },
  {
    label: 'C · Người dùng & Uy tín',
    items: [
      { id: 'C1', name: 'Danh sách người dùng', href: HREF.C1 },
      { id: 'C2', name: 'Chi tiết người dùng', href: HREF.C2 },
      { id: 'C3', name: 'Thông đồng vote', href: HREF.C3, notEnabled: true },
      { id: 'C4', name: 'Tín hiệu gian lận', href: HREF.C4 },
      { id: 'C5', name: 'Khóa/mở khóa tài khoản', href: HREF.C5 },
      { id: 'C7', name: 'Tra cứu ẩn danh', href: HREF.C7 },
      { id: 'C8', name: 'Phiếu tin tưởng & phiên', href: HREF.C8 },
      { id: 'C9', name: 'Tên là số điện thoại', href: HREF.C9 },
    ],
  },
  {
    label: 'E · Vận hành cộng đồng',
    items: [
      { id: 'E1', name: 'Đăng bài mồi thủ công', href: HREF.E1 },
      { id: 'E2', name: 'Quản lý khu vực thí điểm', href: HREF.E2 },
      { id: 'E3', name: 'Lớp dữ liệu chính thống', href: HREF.E3, notEnabled: true },
      { id: 'E4', name: 'Quản lý cộng tác viên', href: HREF.E4 },
    ],
  },
  {
    label: 'F · Pháp lý & Tuân thủ',
    items: [
      { id: 'F1', name: 'Điều khoản & chính sách', href: HREF.F1 },
      { id: 'F2', name: 'Yêu cầu xóa dữ liệu', href: HREF.F2 },
      { id: 'F3', name: 'Log truy cập dữ liệu', href: HREF.F3 },
    ],
  },
  {
    label: 'G · Thống kê & Phân tích',
    items: [
      { id: 'G1', name: 'Tỉ lệ thấy bài mới', href: HREF.G1 },
      { id: 'G2', name: 'Sức khỏe nội dung', href: HREF.G2 },
      { id: 'G3', name: 'Tăng trưởng & kích hoạt', href: HREF.G3 },
      { id: 'G4', name: 'Giữ chân người dùng', href: HREF.G4 },
      { id: 'G5', name: 'Tương tác nội dung', href: HREF.G5 },
      { id: 'G7', name: 'An toàn & kiểm duyệt', href: HREF.G7 },
      { id: 'G8', name: 'Chi phí vận hành', href: HREF.G8 },
      { id: 'G9', name: 'Hoạt động người dùng', href: HREF.G9 },
      { id: 'G10', name: 'Chỉ số sản phẩm', href: HREF.G10 },
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
