import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export type LegalDocType = 'terms' | 'privacy';

export interface LegalDocumentItem {
  id: string;
  docType: LegalDocType;
  version: string;
  content: string;
  isCurrent: boolean;
  createdAt: string;
}

// Quản lý điều khoản/chính sách (tai-lieu-chuc-nang.md #103) — publish() ở đây là nguồn THẬT cho
// AccountLifecycleService.acceptTerms/getTermsStatus (mobile onboarding, mục 67), không phải màn
// cảnh trang trí.
export function useLegalDocuments(docType: LegalDocType) {
  const router = useRouter();
  const [items, setItems] = React.useState<LegalDocumentItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [publishingId, setPublishingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<LegalDocumentItem[]>(
        `/api/admin/legal-documents?docType=${docType}`,
      );
      setItems(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [docType, router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function createDraft(version: string, content: string): Promise<boolean> {
    setSaving(true);
    setError(null);
    try {
      await adminFetch('/api/admin/legal-documents', {
        method: 'POST',
        body: JSON.stringify({ docType, version, content }),
      });
      await load();
      return true;
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không tạo được bản nháp');
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function publish(id: string): Promise<void> {
    setPublishingId(id);
    try {
      await adminFetch(`/api/admin/legal-documents/${id}/publish`, { method: 'PATCH' });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không publish được');
    } finally {
      setPublishingId(null);
    }
  }

  return { items, error, saving, publishingId, createDraft, publish };
}
