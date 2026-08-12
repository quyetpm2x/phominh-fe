import Link from 'next/link';

import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { USERS } from '@/lib/mock/users';

// Danh sách người dùng — C1 (tài liệu nghiệp vụ).
export default function UsersC1Page() {
  return (
    <ScreenAccessGuard screen="C1">
      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-4">Người dùng</div>
          <div className="col-span-2">SĐT</div>
          <div className="col-span-2">Điểm uy tín</div>
          <div className="col-span-2">Tham gia</div>
          <div className="col-span-1">Vi phạm</div>
          <div className="col-span-1">Trạng thái</div>
        </div>
        {USERS.map((u) => (
          <Link
            key={u.phone}
            href="/users/c2"
            className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
          >
            <div className="col-span-4 flex items-center gap-2.5">
              <span className="bg-muted flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold">
                {u.ini}
              </span>
              <span className="font-medium">{u.name}</span>
            </div>
            <div className="col-span-2 font-mono text-xs text-stone-700">{u.phone}</div>
            <div className="col-span-2 font-semibold">{u.rep}</div>
            <div className="col-span-2 text-stone-700">{u.joined}</div>
            <div className="col-span-1 text-stone-700">{u.violations}</div>
            <div className="col-span-1">
              <Pill tone={u.tone}>{u.status}</Pill>
            </div>
          </Link>
        ))}
      </div>
    </ScreenAccessGuard>
  );
}
