'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BRAND, BRAND_LOGO_LETTER } from '../lib/constants';
import { NAV_LINKS } from '../lib/routes';

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border sticky top-0 z-50 border-b bg-[rgba(250,248,245,0.92)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1120px] items-center gap-7 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-sans">
          <span className="from-primary flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br to-[#1A4794] text-base font-bold text-white">
            {BRAND_LOGO_LETTER}
          </span>
          <span className="text-foreground text-[17px] font-bold tracking-[-0.01em]">{BRAND}</span>
        </Link>

        <nav className="flex flex-1 flex-wrap gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground flex items-center gap-1.5 rounded-[9px] px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
              >
                {active ? <span className="bg-accent h-[5px] w-[5px] rounded-full" /> : null}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="from-primary whitespace-nowrap rounded-[11px] bg-gradient-to-br to-[#1A4794] px-[18px] py-[11px] text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(255,201,60,0.3)]"
        >
          Tải app
        </button>
      </div>
    </header>
  );
}
