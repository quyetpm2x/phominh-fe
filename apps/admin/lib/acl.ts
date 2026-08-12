import type { AclLevel, RoleId, ScreenId } from './types';

interface AclEntry {
  owner: AclLevel;
  mod: AclLevel;
  ops: AclLevel;
  note?: string;
}

const F: AclLevel = 'full';
const V: AclLevel = 'view';
const N: AclLevel = 'none';

// Ported từ ACL trong Admin.dc.html.
const ACL: Partial<Record<ScreenId, AclEntry>> = {
  A1: { owner: F, mod: V, ops: V },
  A2: { owner: F, mod: V, ops: V },
  A3: { owner: F, mod: N, ops: N },
  B1: { owner: F, mod: F, ops: N },
  B2: { owner: F, mod: F, ops: N },
  B3: { owner: F, mod: F, ops: N, note: 'Bắt buộc ghi lý do mỗi lần mở nội dung riêng tư' },
  B4: { owner: F, mod: F, ops: N },
  B5: { owner: F, mod: F, ops: V },
  C1: { owner: F, mod: V, ops: N },
  C2: { owner: F, mod: F, ops: N, note: 'Bắt buộc ghi lý do khi mở lịch sử đầy đủ' },
  C3: { owner: F, mod: V, ops: N },
  C4: { owner: F, mod: V, ops: N },
  C5: { owner: F, mod: F, ops: N },
  D1: { owner: F, mod: N, ops: V },
  D2: { owner: F, mod: N, ops: V },
  D3: { owner: F, mod: N, ops: V },
  E1: { owner: F, mod: N, ops: F },
  E2: { owner: F, mod: N, ops: F },
  E3: { owner: F, mod: N, ops: F },
  F1: { owner: F, mod: N, ops: N },
  F2: { owner: F, mod: N, ops: N },
  F3: { owner: F, mod: N, ops: N },
  G1: { owner: F, mod: V, ops: V },
  G2: { owner: F, mod: V, ops: V },
  G3: { owner: F, mod: V, ops: V },
  G4: { owner: F, mod: V, ops: V },
  G5: { owner: F, mod: V, ops: V },
  G6: { owner: F, mod: V, ops: V },
  G7: { owner: F, mod: V, ops: N },
  G8: { owner: F, mod: N, ops: N },
};

export function accessLevel(role: RoleId, id: ScreenId): AclLevel {
  return ACL[id]?.[role] ?? F;
}

export function hasAccess(role: RoleId, id: ScreenId): boolean {
  return accessLevel(role, id) !== N;
}

export function aclNote(id: ScreenId): string | null {
  return ACL[id]?.note ?? null;
}

export interface AclRow {
  id: string;
  name: string;
  o: string;
  m: string;
  c: string;
}

// Ported từ ACL_ROWS trong Admin.dc.html — dùng cho bảng phân quyền chi tiết ở A3.
export const ACL_ROWS: AclRow[] = [
  { id: 'A1–A2', name: 'Đăng nhập, Dashboard tổng quan', o: 'Full', m: 'Xem', c: 'Xem' },
  { id: 'A3', name: 'Vai trò & phân quyền', o: 'Full', m: '✗', c: '✗' },
  { id: 'B1–B2', name: 'Report bài đăng, bình luận công khai', o: 'Full', m: 'Full', c: '✗' },
  {
    id: 'B3',
    name: 'Report bình luận riêng tư — nhạy cảm nhất',
    o: 'Full',
    m: 'Full, bắt buộc ghi lý do mỗi lần mở',
    c: '✗',
  },
  { id: 'B4', name: 'Cụm tấn công tự động', o: 'Full', m: 'Full', c: '✗' },
  {
    id: 'B5',
    name: 'Xác minh tin khẩn cấp',
    o: 'Full',
    m: 'Full',
    c: 'Xem — để biết tình hình khu mình phụ trách',
  },
  { id: 'C1', name: 'Danh sách người dùng', o: 'Full', m: 'Xem + tìm kiếm', c: '✗' },
  {
    id: 'C2',
    name: 'Chi tiết một người dùng — lịch sử đầy đủ',
    o: 'Full',
    m: 'Full, bắt buộc ghi lý do',
    c: '✗',
  },
  { id: 'C3–C4', name: 'Phát hiện thông đồng, tín hiệu gian lận', o: 'Full', m: 'Xem', c: '✗' },
  { id: 'C5', name: 'Khóa / mở khóa tài khoản', o: 'Full', m: 'Full', c: '✗' },
  { id: 'D1–D3', name: 'Quản lý merchant', o: 'Full', m: '✗', c: 'Xem' },
  { id: 'E1–E3', name: 'Cold-start, khu vực, dữ liệu chính thống', o: 'Full', m: '✗', c: 'Full' },
  { id: 'F1', name: 'Điều khoản / chính sách', o: 'Full', m: '✗', c: '✗' },
  { id: 'F2', name: 'Yêu cầu xóa dữ liệu', o: 'Full', m: '✗', c: '✗' },
  { id: 'F3', name: 'Audit log truy cập nhạy cảm', o: 'Chỉ Owner', m: '✗', c: '✗' },
  {
    id: 'G1–G7',
    name: 'Thống kê, trừ chi phí',
    o: 'Full',
    m: 'Xem — trọng tâm G7 an toàn',
    c: 'Xem — G1 đến G6',
  },
  { id: 'G8', name: 'Chi phí vận hành', o: 'Chỉ Owner', m: '✗', c: '✗' },
];
