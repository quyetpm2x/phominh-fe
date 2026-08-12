import { cn } from '@pho-minh/ui';
import type { ReactNode } from 'react';

export function AnalyticsCard({
  title,
  desc,
  action,
  foot,
  wide,
  children,
}: {
  title: string;
  desc?: string;
  action?: string;
  foot?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn('border-border bg-background rounded-lg border p-5', wide && 'col-span-2')}>
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-snug">{title}</div>
          {desc && <p className="mt-1 max-w-xl text-xs leading-relaxed text-stone-600">{desc}</p>}
        </div>
        {action && (
          <div className="border-border flex-none rounded-md border px-2.5 py-1.5 text-xs font-medium">
            {action}
          </div>
        )}
      </div>
      {children}
      {foot && (
        <p className="mt-3.5 border-t border-stone-100 pt-3 text-xs leading-relaxed text-stone-600">
          {foot}
        </p>
      )}
    </div>
  );
}
