'use client';

import * as React from 'react';

// Form tạo bản nháp điều khoản/chính sách mới (tai-lieu-chuc-nang.md #103) — tách khỏi page.tsx để
// giữ file trang gọn.
export function LegalDocumentForm({
  saving,
  onSubmit,
}: {
  saving: boolean;
  onSubmit: (version: string, content: string) => void;
}) {
  const [version, setVersion] = React.useState('');
  const [content, setContent] = React.useState('');
  const canSubmit = version.trim().length > 0 && content.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit(version.trim(), content.trim());
        setVersion('');
        setContent('');
      }}
      className="border-border bg-background rounded-lg border p-4"
    >
      <input
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        placeholder="Phiên bản (VD: 2026-09)"
        className="border-border w-full rounded-md border px-3 py-2 text-sm"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nội dung văn bản..."
        rows={6}
        className="border-border mt-2.5 w-full rounded-md border px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={!canSubmit || saving}
        className="mt-2.5 rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
      >
        {saving ? 'Đang lưu…' : 'Tạo bản nháp'}
      </button>
    </form>
  );
}
