import { cn } from '@pho-minh/ui';

import type { Tone } from '@/lib/types';

const TONE_CLASSES: Record<Tone, string> = {
  ok: 'bg-admin-green-soft text-admin-green',
  warn: 'bg-admin-amber-soft text-admin-amber-text',
  bad: 'bg-admin-red-soft text-admin-red',
  neutral: 'bg-stone-75 text-stone-700',
};

export function Pill({
  tone,
  children,
  className,
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold',
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
