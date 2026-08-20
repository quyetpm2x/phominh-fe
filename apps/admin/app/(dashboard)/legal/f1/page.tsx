'use client';

import * as React from 'react';

import { LegalDocumentForm } from '@/components/legal-document-form';
import { Pill } from '@/components/pill';
import {
  useLegalDocuments,
  type LegalDocType,
  type LegalDocumentItem,
} from '@/hooks/useLegalDocuments';

const DOC_TYPE_LABEL: Record<LegalDocType, string> = {
  terms: 'Điều khoản sử dụng',
  privacy: 'Chính sách quyền riêng tư',
};

// Quản lý điều khoản/chính sách (tai-lieu-chuc-nang.md #103) — trước đây backend chỉ có hằng số
// CURRENT_TERMS_VERSION cố định, không sửa được qua API. Publish 1 bản mới ở đây ảnh hưởng THẬT tới
// luồng bắt buộc đồng ý điều khoản lúc onboarding mobile (mục 67), xem AccountLifecycleService.
export default function LegalF1Page() {
  const [docType, setDocType] = React.useState<LegalDocType>('terms');
  const { items, error, saving, publishingId, createDraft, publish } = useLegalDocuments(docType);

  return (
    <>
      <div className="mb-4 flex gap-2">
        {(Object.keys(DOC_TYPE_LABEL) as LegalDocType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setDocType(t)}
            className={`rounded-md px-3 py-1.5 text-xs ${
              docType === t
                ? 'bg-stone-900 font-semibold text-white'
                : 'border border-stone-200 text-stone-700'
            }`}
          >
            {DOC_TYPE_LABEL[t]}
          </button>
        ))}
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <LegalDocumentForm
        saving={saving}
        onSubmit={(version, content) => void createDraft(version, content)}
      />

      <div className="mt-4 flex flex-col gap-3">
        <VersionList
          items={items}
          publishingId={publishingId}
          onPublish={(id) => void publish(id)}
        />
      </div>
    </>
  );
}

function VersionList({
  items,
  publishingId,
  onPublish,
}: {
  items: LegalDocumentItem[] | null;
  publishingId: string | null;
  onPublish: (id: string) => void;
}) {
  if (items === null) return <div className="text-sm text-stone-600">Đang tải…</div>;
  if (items.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
        Chưa có phiên bản nào.
      </div>
    );
  }
  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="border-border bg-background rounded-lg border p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="font-mono text-sm font-semibold">{item.version}</span>
              <span className="ml-2 text-xs text-stone-500">
                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
            {item.isCurrent ? (
              <Pill tone="ok">Đang áp dụng</Pill>
            ) : (
              <button
                type="button"
                disabled={publishingId === item.id}
                onClick={() => onPublish(item.id)}
                className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium disabled:opacity-50"
              >
                {publishingId === item.id ? 'Đang publish…' : 'Publish'}
              </button>
            )}
          </div>
          <p className="mt-2 whitespace-pre-wrap text-xs text-stone-700">{item.content}</p>
        </div>
      ))}
    </>
  );
}
