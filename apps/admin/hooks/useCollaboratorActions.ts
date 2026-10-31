import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface UserLookupResult {
  id: string;
  nickname: string | null;
  realName: string | null;
  phoneNumber: string;
}

// Hành động sửa đổi cho màn Quản lý cộng tác viên — tách khỏi useCollaborators (chỉ load danh
// sách) để mỗi hook giữ dưới 60 dòng.
export function useCollaboratorActions(
  reload: () => Promise<void>,
  setError: (e: string | null) => void,
) {
  const [savingId, setSavingId] = React.useState<string | null>(null);

  async function lookupByPhone(phone: string): Promise<UserLookupResult | null> {
    try {
      return await adminFetch<UserLookupResult>(
        `/api/admin/users/lookup?query=${encodeURIComponent(phone.trim())}`,
      );
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không tìm thấy tài khoản này');
      return null;
    }
  }

  async function withSaving(userId: string, action: () => Promise<void>, failMsg: string) {
    setSavingId(userId);
    try {
      await action();
      await reload();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : failMsg);
    } finally {
      setSavingId(null);
    }
  }

  const markCollaborator = (userId: string) =>
    withSaving(
      userId,
      () =>
        adminFetch('/api/admin/collaborators', {
          method: 'POST',
          body: JSON.stringify({ userId }),
        }),
      'Không đánh dấu được',
    );

  const unmarkCollaborator = (userId: string) =>
    withSaving(
      userId,
      () => adminFetch(`/api/admin/collaborators/${userId}`, { method: 'DELETE' }),
      'Không bỏ đánh dấu được',
    );

  const setKpiTarget = (
    userId: string,
    target: { postsTarget: number; votesTarget: number; commentsTarget: number },
  ) =>
    withSaving(
      userId,
      () =>
        adminFetch(`/api/admin/collaborators/${userId}/kpi-target`, {
          method: 'PATCH',
          body: JSON.stringify(target),
        }),
      'Không lưu được mục tiêu',
    );

  return { savingId, lookupByPhone, markCollaborator, unmarkCollaborator, setKpiTarget };
}
