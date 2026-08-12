'use client';

import { useState } from 'react';

export function FaqItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-border hover:border-accent-soft-border-strong overflow-hidden rounded-2xl border bg-white transition-all hover:shadow-[0_8px_20px_rgba(32,36,43,.07)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="py-4.5 text-foreground flex w-full items-center gap-3.5 px-5 text-left font-sans text-[16.5px] font-semibold"
      >
        <span className="flex-1">{question}</span>
        <span className="text-xl text-gray-800">{open ? '−' : '+'}</span>
      </button>
      {open ? (
        <div className="px-5 pb-5 text-[15.5px] leading-[1.7] text-gray-800 [text-wrap:pretty]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
