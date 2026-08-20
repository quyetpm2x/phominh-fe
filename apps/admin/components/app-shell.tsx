'use client';

import { cn } from '@pho-minh/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { AdminMenu } from '@/components/admin-menu';
import { NAV, screenIdForPath } from '@/lib/nav';
import { screenDesc, screenName } from '@/lib/screens';
import type { ScreenId } from '@/lib/types';

// Sidebar + topbar dùng chung cho mọi trang trong (dashboard) — ported từ khung sườn
// (sidebar nav + topbar) trong Admin.dc.html. Không còn lọc menu theo "vai trò demo" — phân quyền
// thật nằm ở backend (AdminPermissionGuard), FE hiện đầy đủ menu và để backend từ chối thao tác
// không đủ quyền.
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeScreen = screenIdForPath(pathname);

  return (
    <div className="text-foreground flex h-screen overflow-hidden">
      <Sidebar activeScreen={activeScreen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar activeScreen={activeScreen} />
        <main className="flex-1 overflow-y-auto px-6 py-5 pb-10">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ activeScreen }: { activeScreen: ScreenId | undefined }) {
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

      <SidebarNav activeScreen={activeScreen} />
    </aside>
  );
}

function SidebarNav({ activeScreen }: { activeScreen: ScreenId | undefined }) {
  return (
    <nav className="flex-1 overflow-y-auto p-2.5 pb-5">
      {NAV.map((group) => (
        <div key={group.label} className="mb-3.5">
          <div className="px-2.5 pb-1.5 text-xs font-semibold uppercase tracking-wide text-white/40">
            {group.label}
          </div>
          {group.items.map((item) => (
            <SidebarNavItem key={item.id} item={item} active={item.id === activeScreen} />
          ))}
        </div>
      ))}
    </nav>
  );
}

function SidebarNavItem({
  item,
  active,
}: {
  item: { id: ScreenId; name: string; href: string; badge?: number };
  active: boolean;
}) {
  const rowClassName = cn(
    'mb-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 text-sm',
    active && 'bg-admin-green font-semibold text-white',
    !active && 'text-white/70 hover:bg-white/5',
  );

  return (
    <Link href={item.href} className={rowClassName}>
      <span className="w-5 flex-none font-mono text-xs opacity-60">{item.id}</span>
      <span className="flex-1 leading-snug">{item.name}</span>
      {item.badge != null && (
        <span className="bg-admin-red flex-none rounded-full px-1.5 py-0.5 font-mono text-xs font-semibold text-white">
          {item.badge}
        </span>
      )}
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

      <AdminMenu />
    </header>
  );
}
