'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { accessLevel, aclNote } from '@/lib/acl';
import { ROLES } from '@/lib/nav';
import type { ScreenId } from '@/lib/types';

import { useRole } from './role-context';

// Ported từ on.denied / on.readonly / on.aclNote trong Admin.dc.html: chặn hoặc cảnh báo nội
// dung theo ACL[screen][role] của vai trò đang xem, bọc quanh nội dung thật của từng trang.
export function ScreenAccessGuard({ screen, children }: { screen: ScreenId; children: ReactNode }) {
  const { role } = useRole();
  const access = accessLevel(role, screen);
  const roleObj = ROLES.find((r) => r.id === role)!;

  if (access === 'none') {
    return (
      <div className="border-border bg-background mx-auto mt-10 max-w-xl rounded-lg border p-9 text-center">
        <div className="bg-muted text-muted-foreground mx-auto flex h-11 w-11 items-center justify-center rounded-xl text-lg">
          ✕
        </div>
        <div className="text-foreground mt-4 text-base font-semibold">Không có quyền truy cập</div>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          Vai trò {roleObj.full} không có quyền truy cập màn hình này. Liên hệ chủ sở hữu nếu bạn
          cần quyền.
        </p>
        <div className="mt-3.5 font-mono text-xs text-stone-500">
          Lần thử truy cập này đã được ghi vào log F3
        </div>
      </div>
    );
  }

  const note = aclNote(screen);

  return (
    <>
      {access === 'view' && (
        <div className="border-border bg-background mb-4 flex items-center gap-3 rounded-lg border px-4 py-3">
          <span className="font-mono text-xs font-semibold text-stone-600">CHỈ XEM</span>
          <span className="flex-1 text-sm leading-snug text-stone-700">
            Vai trò {roleObj.full} chỉ được xem màn hình này. Mọi thao tác thay đổi dữ liệu sẽ bị từ
            chối và ghi vào log F3.
          </span>
        </div>
      )}
      {note && (
        <div className="border-admin-amber-soft-border bg-admin-amber-soft mb-4 flex items-center gap-3 rounded-lg border px-4 py-3">
          <span className="bg-admin-amber h-2 w-2 flex-none rounded-full" />
          <span className="text-admin-amber-text flex-1 text-sm leading-snug">
            {note} — thao tác được ghi vào log F3.
          </span>
        </div>
      )}
      {role !== 'ops' && (
        <div className="border-admin-red-soft-border bg-admin-red-soft mb-4 flex items-center gap-3 rounded-lg border px-4 py-3">
          <span className="bg-admin-red h-2 w-2 flex-none rounded-full" />
          <div className="text-admin-red flex-1 text-sm leading-snug">
            Hệ thống đang tạm khóa bình luận ở <strong>2 bài đăng</strong> do phát hiện cụm tấn công
            dồn dập trong 30 phút qua. Cần admin xem lại.
          </div>
          <Link
            href="/reports/b4"
            className="text-admin-red border-admin-red-soft-border rounded-md border bg-white px-2.5 py-1.5 text-xs font-semibold"
          >
            Xem B4
          </Link>
        </div>
      )}
      {children}
    </>
  );
}
