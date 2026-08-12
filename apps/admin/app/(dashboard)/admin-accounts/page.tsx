'use client';

import { cn } from '@pho-minh/ui';

import { Pill } from '@/components/pill';
import { useRole } from '@/components/role-context';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { ACL_ROWS } from '@/lib/acl';
import { ADMINS, initials } from '@/lib/mock/admin-accounts';
import { ROLES } from '@/lib/nav';
import type { RoleId, Tone } from '@/lib/types';

// Tạo/phân quyền admin — mục 9.9 (tài liệu nghiệp vụ), A3 trong Admin.dc.html. Phân quyền
// checkbox tự viết dựa trên bảng permissions + admin_user_permissions (mục 4 tài liệu FE).
export default function AdminAccountsPage() {
  return (
    <ScreenAccessGuard screen="A3">
      <RoleCards />
      <AclTable />
      <AdminsTable />
    </ScreenAccessGuard>
  );
}

function RoleCards() {
  const { role } = useRole();

  return (
    <div className="grid grid-cols-3 gap-3.5">
      {ROLES.map((r) => (
        <div
          key={r.id}
          className={cn(
            'bg-background rounded-lg border p-5',
            r.id === role ? 'border-primary' : 'border-border',
          )}
        >
          <div className="flex items-start justify-between gap-2.5">
            <div className="text-base font-semibold leading-snug">{r.full}</div>
            <span className="whitespace-nowrap text-xs text-stone-600">{r.people} người</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">{r.job}</p>
          {r.id === role && (
            <div className="bg-admin-green-soft text-admin-green mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold">
              Đang xem với vai trò này
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AclTable() {
  return (
    <div className="border-border bg-background mt-4 overflow-hidden rounded-lg border">
      <div className="border-b border-stone-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">
              Bảng phân quyền chi tiết theo từng nhóm màn hình
            </div>
            <p className="mt-1 text-xs leading-snug text-stone-600">
              Full là xem và thao tác, Xem là chỉ đọc, ✗ là không truy cập được và mọi lần thử đều
              ghi log.
            </p>
          </div>
          <button
            type="button"
            className="border-border flex-none rounded-md border px-2.5 py-1.5 text-xs font-medium"
          >
            Chỉnh quyền
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-5">Nhóm / trang</div>
        <div className="col-span-1">Owner</div>
        <div className="col-span-3">Moderator</div>
        <div className="col-span-3">Community Ops</div>
      </div>
      {ACL_ROWS.map((row) => (
        <div
          key={row.id}
          className="border-stone-75 grid grid-cols-12 gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-5">
            <span className="font-semibold">{row.id}</span>{' '}
            <span className="text-xs text-stone-600">{row.name}</span>
          </div>
          <AclCell value={row.o} className="col-span-1" />
          <AclCell value={row.m} className="col-span-3" />
          <AclCell value={row.c} className="col-span-3" />
        </div>
      ))}
    </div>
  );
}

function aclCellTone(value: string): string {
  if (value === '✗') return 'text-stone-400';
  if (value === 'Chỉ Owner') return 'text-admin-red';
  return 'text-admin-green';
}

function AclCell({ value, className }: { value: string; className?: string }) {
  return <div className={cn('text-sm leading-snug', aclCellTone(value), className)}>{value}</div>;
}

function AdminsTable() {
  return (
    <div className="border-border bg-background mt-4 overflow-hidden rounded-lg border">
      <div className="flex items-start justify-between gap-3 border-b border-stone-100 px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Tài khoản admin</div>
          <div className="mt-1 text-xs text-stone-600">
            Chỉ chủ sở hữu mới cấp phát hoặc thu hồi được quyền.
          </div>
        </div>
        <button
          type="button"
          className="flex-none rounded-md bg-stone-900 px-2.5 py-1.5 text-xs font-semibold text-white"
        >
          Thêm admin
        </button>
      </div>
      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-4">Thành viên</div>
        <div className="col-span-3">Vai trò</div>
        <div className="col-span-3">Khu vực phụ trách</div>
        <div className="col-span-2">Đăng nhập gần nhất</div>
      </div>
      {ADMINS.map((admin) => (
        <AdminRow key={admin.email} admin={admin} />
      ))}
    </div>
  );
}

function adminRoleTone(roleId: RoleId): Tone {
  if (roleId === 'owner') return 'bad';
  if (roleId === 'mod') return 'ok';
  return 'neutral';
}

function AdminRow({
  admin,
}: {
  admin: { name: string; email: string; roleId: RoleId; area: string; last: string };
}) {
  const roleDef = ROLES.find((r) => r.id === admin.roleId)!;

  return (
    <div className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0">
      <div className="col-span-4 flex items-center gap-2.5">
        <span className="bg-muted flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold">
          {initials(admin.name)}
        </span>
        <span className="min-w-0">
          <span className="block font-medium">{admin.name}</span>
          <span className="block font-mono text-xs text-stone-600">{admin.email}</span>
        </span>
      </div>
      <div className="col-span-3">
        <Pill tone={adminRoleTone(admin.roleId)}>{roleDef.name}</Pill>
      </div>
      <div className="col-span-3 text-stone-700">{admin.area}</div>
      <div className="col-span-2 text-xs text-stone-600">{admin.last}</div>
    </div>
  );
}
