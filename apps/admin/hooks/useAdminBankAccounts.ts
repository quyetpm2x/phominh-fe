'use client';

import * as React from 'react';

import { useAdminErrorText } from './useAdminResource';

import { adminFetch } from '@/lib/adminApi';

export interface AdminBankAccountItem {
  id: string;
  userName: string;
  userPhoneNumber: string;
  bankCode: string;
  accountNumberMasked: string;
  accountHolderName: string;
  createdAt: string;
}

const BASE = '/api/admin/bank-accounts';

// Hàng đợi duyệt tài khoản ngân hàng: chỉ tài khoản đã duyệt mới rút được tiền.
export function useAdminBankAccounts() {
  const errorText = useAdminErrorText();
  const [accounts, setAccounts] = React.useState<AdminBankAccountItem[] | null>(null);
  const [revealed, setRevealed] = React.useState<Record<string, string>>({});
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const reload = React.useCallback(async () => {
    try {
      setAccounts(await adminFetch<AdminBankAccountItem[]>(`${BASE}/pending`));
    } catch (err) {
      setError(errorText(err));
    }
  }, [errorText]);

  React.useEffect(() => {
    void reload();
  }, [reload]);

  const act = async (id: string, action: 'verify' | 'reject') => {
    setPendingId(id);
    setError(null);
    try {
      await adminFetch(`${BASE}/${id}/${action}`, { method: 'POST' });
      await reload();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setPendingId(null);
    }
  };

  const reveal = async (id: string) => {
    setError(null);
    try {
      const { accountNumber } = await adminFetch<{ accountNumber: string }>(
        `${BASE}/${id}/reveal`,
        {
          method: 'POST',
        },
      );
      setRevealed((current) => ({ ...current, [id]: accountNumber }));
    } catch (err) {
      setError(errorText(err));
    }
  };

  return { accounts, revealed, pendingId, error, act, reveal };
}
