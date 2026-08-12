import type { ChartTone } from '@/lib/mock/analytics';
import type { Tone } from '@/lib/types';

export function toPillTone(t: ChartTone): Tone {
  return t === 'neu' ? 'neutral' : t;
}

export function toneBg(t?: ChartTone): string {
  if (t === 'ok') return 'bg-admin-green';
  if (t === 'warn') return 'bg-admin-amber';
  if (t === 'bad') return 'bg-admin-red';
  return 'bg-stone-400';
}

export function toneText(t?: ChartTone): string {
  if (t === 'ok') return 'text-admin-green';
  if (t === 'warn') return 'text-admin-amber-text';
  if (t === 'bad') return 'text-admin-red';
  return 'text-stone-600';
}
