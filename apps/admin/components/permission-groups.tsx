'use client';

import type { PermissionOption } from '@/hooks/useAdminAccounts';

export function groupByName(permissions: PermissionOption[]): Record<string, PermissionOption[]> {
  const groups: Record<string, PermissionOption[]> = {};
  for (const p of permissions) {
    (groups[p.groupName] ??= []).push(p);
  }
  return groups;
}

// Lưới checkbox quyền theo nhóm — dùng chung giữa form tạo admin (#111) và form sửa quyền (#112).
export function PermissionGroups({
  groups,
  selected,
  onToggle,
}: {
  groups: Record<string, PermissionOption[]>;
  selected: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      {Object.entries(groups).map(([groupName, items]) => (
        <div key={groupName}>
          <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            {groupName}
          </div>
          {items.map((p) => (
            <label key={p.id} className="mt-1 flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={selected.has(p.permissionKey)}
                onChange={() => onToggle(p.permissionKey)}
              />
              {p.label}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
