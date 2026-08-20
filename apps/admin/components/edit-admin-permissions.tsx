'use client';

import * as React from 'react';

import { groupByName, PermissionGroups } from '@/components/permission-groups';
import type { PermissionOption } from '@/hooks/useAdminAccounts';

// Sửa/thu hồi quyền admin đã cấp (tai-lieu-chuc-nang.md #112) — hàng mở rộng bên dưới AdminRow,
// chỉnh sửa lại tập checkbox rồi lưu THẲNG (thay toàn bộ, không cộng dồn).
export function EditAdminPermissions({
  permissions,
  currentKeys,
  saving,
  onSave,
  onCancel,
}: {
  permissions: PermissionOption[];
  currentKeys: string[];
  saving: boolean;
  onSave: (permissionKeys: string[]) => void;
  onCancel: () => void;
}) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set(currentKeys));
  const groups = groupByName(permissions);

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="col-span-12 border-t border-stone-100 bg-stone-50 px-2 py-3">
      <PermissionGroups groups={groups} selected={selected} onToggle={toggle} />
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium"
        >
          Huỷ
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => onSave([...selected])}
          className="rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          {saving ? 'Đang lưu…' : 'Lưu quyền'}
        </button>
      </div>
    </div>
  );
}
