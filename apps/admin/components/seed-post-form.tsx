'use client';

import * as React from 'react';

import type { PilotAreaItem } from '@/hooks/usePilotAreas';
import type { CreateSeedPostInput } from '@/hooks/useSeedContent';

const SELECT_CLASS = 'border-border rounded-md border px-3 py-2 text-sm';

// Form đăng bài mồi (tai-lieu-chuc-nang.md #100) — đặt bài tại TÂM toạ độ của 1 khu vực thí điểm
// đã có sẵn (#101), không có bản đồ chọn điểm tự do (chưa có widget bản đồ nào trong admin panel).
export function SeedPostForm({
  areas,
  creating,
  onSubmit,
}: {
  areas: PilotAreaItem[] | null;
  creating: boolean;
  onSubmit: (input: CreateSeedPostInput) => void;
}) {
  const [pilotAreaId, setPilotAreaId] = React.useState('');
  const [content, setContent] = React.useState('');

  const canSubmit = pilotAreaId !== '' && content.trim().length > 0 && !creating;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit({ pilotAreaId, content: content.trim(), postType: 'life' });
        setContent('');
      }}
      className="border-border bg-background rounded-lg border p-4"
    >
      <AreaSelect areas={areas} value={pilotAreaId} onChange={setPilotAreaId} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nội dung bài đăng..."
        rows={3}
        className="border-border mt-2.5 w-full rounded-md border px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2.5 rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
      >
        {creating ? 'Đang đăng…' : 'Đăng bài mồi'}
      </button>
    </form>
  );
}

function AreaSelect({
  areas,
  value,
  onChange,
}: {
  areas: PilotAreaItem[] | null;
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={SELECT_CLASS}>
      <option value="">Chọn khu vực thí điểm…</option>
      {areas?.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      ))}
    </select>
  );
}
