import type { RoleId } from '../types';

// Ported từ ADMINS trong Admin.dc.html — dùng cho A3.
export interface AdminAccount {
  name: string;
  email: string;
  roleId: RoleId;
  area: string;
  last: string;
}

export const ADMINS: AdminAccount[] = [
  {
    name: 'Hồng Thắm',
    email: 'tham.nguyen@phominh.vn',
    roleId: 'owner',
    area: 'Toàn hệ thống',
    last: 'Hôm nay 07:12',
  },
  {
    name: 'Quốc Duy',
    email: 'duy.tran@phominh.vn',
    roleId: 'owner',
    area: 'Toàn hệ thống',
    last: 'Hôm qua 22:40',
  },
  {
    name: 'Ngân Hà',
    email: 'ha.le@phominh.vn',
    roleId: 'mod',
    area: 'Bến Nghé, Tân Định',
    last: 'Hôm nay 06:55',
  },
  {
    name: 'Trung Kiên',
    email: 'kien.pham@phominh.vn',
    roleId: 'mod',
    area: 'Bình Thạnh',
    last: 'Hôm nay 05:20',
  },
  {
    name: 'Bảo Trân',
    email: 'tran.vo@phominh.vn',
    roleId: 'ops',
    area: 'Thủ Đức',
    last: 'Hôm nay 08:04',
  },
  {
    name: 'Minh Đức',
    email: 'duc.ngo@phominh.vn',
    roleId: 'ops',
    area: 'Bình Thạnh, Thủ Đức',
    last: '04/08 17:32',
  },
];

export function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('');
}
