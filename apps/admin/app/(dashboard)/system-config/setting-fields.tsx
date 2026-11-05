'use client';

import * as React from 'react';

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border bg-background rounded-lg border p-5">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function TextSetting(props: {
  label: string;
  hint: string;
  value: string;
  onSave: (text: string) => void;
}) {
  const [text, setText] = React.useState(props.value);
  React.useEffect(() => setText(props.value), [props.value]);
  return (
    <div className="mb-3">
      <div className="text-sm font-semibold">{props.label}</div>
      <div className="mb-1 text-xs text-stone-600">{props.hint}</div>
      <div className="flex gap-2">
        <input
          value={text}
          aria-label={props.label}
          onChange={(event) => setText(event.target.value)}
          className="border-border flex-1 rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="button"
          disabled={text === props.value}
          onClick={() => props.onSave(text)}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
