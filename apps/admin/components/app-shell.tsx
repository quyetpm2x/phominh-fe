'use client';

import { cn } from '@pho-minh/ui';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { accessLevel } from '@/lib/acl';
import { NAV, ROLES, type RoleDef, screenIdForPath } from '@/lib/nav';
import { screenDesc, screenName } from '@/lib/screens';
import type { RoleId, ScreenId } from '@/lib/types';

import { useRole } from './role-context';

// Sidebar + topbar dùng chung cho mọi trang trong (dashboard) — ported từ khung sườn
// (sidebar nav + topbar) trong Admin.dc.html.
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useRole();
  const activeScreen = screenIdForPath(pathname);

  return (
    <div className="text-foreground flex h-screen overflow-hidden">
      <Sidebar role={role} activeScreen={activeScreen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar activeScreen={activeScreen} />
        <main className="flex-1 overflow-y-auto px-6 py-5 pb-10">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ role, activeScreen }: { role: RoleId; activeScreen: ScreenId | undefined }) {
  const router = useRouter();
  const roleObj = ROLES.find((r) => r.id === role)!;

  function logout() {
    document.cookie = 'admin_access_token=; path=/; max-age=0';
    router.push('/login');
  }

  return (
    <aside className="flex w-64 flex-none flex-col overflow-hidden bg-stone-900 text-white">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-4">
        <div className="bg-admin-green flex h-9 w-9 flex-none items-center justify-center rounded-lg text-sm font-bold">
          P
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Phố Mình</div>
          <div className="mt-0.5 font-mono text-xs text-white/45">ADMIN CONSOLE</div>
        </div>
      </div>

      <SidebarNav role={role} activeScreen={activeScreen} />

      <div className="flex items-center gap-2.5 border-t border-white/10 px-4 py-3">
        <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
          HT
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium">Hồng Thắm</div>
          <div className="text-white/42 text-xs">{roleObj.name}</div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-white/42 flex-none text-xs hover:text-white/70"
        >
          Thoát
        </button>
      </div>
    </aside>
  );
}

function SidebarNav({ role, activeScreen }: { role: RoleId; activeScreen: ScreenId | undefined }) {
  return (
    <nav className="flex-1 overflow-y-auto p-2.5 pb-5">
      {NAV.map((group) => (
        <div key={group.label} className="mb-3.5">
          <div className="px-2.5 pb-1.5 text-xs font-semibold uppercase tracking-wide text-white/40">
            {group.label}
          </div>
          {group.items.map((item) => (
            <SidebarNavItem
              key={item.id}
              role={role}
              item={item}
              active={item.id === activeScreen}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}

function SidebarNavItem({
  role,
  item,
  active,
}: {
  role: RoleId;
  item: { id: ScreenId; name: string; href: string; badge?: number };
  active: boolean;
}) {
  const access = accessLevel(role, item.id);
  const locked = access === 'none';
  const showBadge = access === 'full' && item.badge != null;

  const rowClassName = cn(
    'mb-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm',
    locked && 'cursor-not-allowed text-white/25',
    !locked && active && 'bg-admin-green font-semibold text-white',
    !locked && !active && 'text-white/70 hover:bg-white/5',
  );

  const content = (
    <>
      <span className="w-5 flex-none font-mono text-xs opacity-60">{item.id}</span>
      <span className="flex-1 leading-snug">{item.name}</span>
      {showBadge && (
        <span className="bg-admin-red flex-none rounded-full px-1.5 py-0.5 font-mono text-xs font-semibold text-white">
          {item.badge}
        </span>
      )}
      {locked && <span className="text-white/28 flex-none font-mono text-xs">✕</span>}
    </>
  );

  if (locked) {
    return (
      <div className={rowClassName} aria-disabled>
        {content}
      </div>
    );
  }

  return (
    <Link href={item.href} className={rowClassName}>
      {content}
    </Link>
  );
}

function Topbar({ activeScreen }: { activeScreen: ScreenId | undefined }) {
  return (
    <header className="border-border bg-stone-25 flex min-h-16 flex-none items-center gap-4 border-b px-6 py-2.5">
      <div className="min-w-0 flex-1">
        {activeScreen && (
          <>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-stone-600">{activeScreen}</span>
              <span className="text-foreground text-base font-semibold tracking-tight">
                {screenName(activeScreen)}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-stone-600">{screenDesc(activeScreen)}</div>
          </>
        )}
      </div>

      <div className="border-border hidden h-9 w-64 flex-none items-center gap-2 rounded-md border bg-white px-3 text-sm text-stone-500 sm:flex">
        Tìm SĐT, mã bài, mã report…
      </div>

      <RoleSwitcher />
    </header>
  );
}

function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = React.useState(false);
  const roleObj = ROLES.find((r) => r.id === role)!;

  function pick(r: RoleDef) {
    setRole(r.id);
    setOpen(false);
  }

  return (
    <div className="relative flex-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-border flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-white px-3 text-sm font-medium"
      >
        <span className="bg-admin-green h-1.5 w-1.5 flex-none rounded-full" />
        {roleObj.full}
        <span className="text-xs text-stone-600">▼</span>
      </button>
      {open && (
        <div className="border-border absolute right-0 top-11 z-30 w-72 overflow-hidden rounded-lg border bg-white shadow-lg">
          <div className="px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
            Xem giao diện với vai trò
          </div>
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => pick(r)}
              className={cn(
                'border-stone-75 block w-full border-t px-3.5 py-2.5 text-left',
                r.id === role && 'bg-stone-50',
              )}
            >
              <div className="text-foreground text-sm font-semibold">{r.full}</div>
              <div className="mt-0.5 text-xs leading-snug text-stone-600">{r.job}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
