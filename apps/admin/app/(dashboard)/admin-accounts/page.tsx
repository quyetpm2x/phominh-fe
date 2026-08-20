'use client';

import { AdminAccountsPanel } from '@/components/admin-accounts-panel';

// Tạo/phân quyền admin — mục 9.9 (tài liệu nghiệp vụ), A3 trong Admin.dc.html. Phân quyền
// checkbox tự viết dựa trên bảng permissions + admin_user_permissions (mục 4 tài liệu FE). Chỉ
// Owner được khởi tạo sẵn — các tài khoản admin khác do Owner (hoặc admin có quyền manage_admins)
// tự tạo và tự chọn quyền qua checkbox, không có khái niệm "vai trò" cố định (Moderator/Community
// Ops) — bảng ACL tĩnh + role switcher demo (RoleCards/AclTable, ported từ Admin.dc.html) đã bị bỏ
// vì không phản ánh đúng mô hình phân quyền thật.
export default function AdminAccountsPage() {
  return <AdminAccountsPanel />;
}
