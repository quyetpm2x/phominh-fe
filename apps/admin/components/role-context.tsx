'use client';

import * as React from 'react';

import type { RoleId } from '@/lib/types';

const STORAGE_KEY = 'admin_view_role';

interface RoleContextValue {
  role: RoleId;
  setRole: (role: RoleId) => void;
}

const RoleContext = React.createContext<RoleContextValue | null>(null);

function isRoleId(value: string | null): value is RoleId {
  return value === 'owner' || value === 'mod' || value === 'ops';
}

// "Xem giao diện với vai trò" — mock gốc giữ role trong state của 1 component duy nhất nên
// tự sống sót qua các lần đổi "route" nội bộ; ở đây mỗi trang Next.js là 1 lần mount riêng
// nên phải nâng role lên context + localStorage để không bị reset khi chuyển trang.
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<RoleId>('owner');

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isRoleId(stored)) setRoleState(stored);
  }, []);

  const setRole = React.useCallback((next: RoleId) => {
    setRoleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = React.useMemo(() => ({ role, setRole }), [role, setRole]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleContextValue {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error('useRole phải được gọi bên trong RoleProvider');
  return ctx;
}
