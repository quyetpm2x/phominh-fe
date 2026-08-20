'use client';

import * as React from 'react';

import { AddCollaboratorForm } from '@/components/add-collaborator-form';
import { CollaboratorKpiTable } from '@/components/collaborator-kpi-table';
import { useCollaboratorActions } from '@/hooks/useCollaboratorActions';
import { useCollaborators } from '@/hooks/useCollaborators';

type RangeMode = 'day' | 'month';

function todayValue(mode: RangeMode): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return mode === 'day' ? `${y}-${m}-${String(now.getDate()).padStart(2, '0')}` : `${y}-${m}`;
}

function computeRange(mode: RangeMode, value: string): { dateFrom: string; dateTo: string } {
  if (mode === 'day') {
    const from = new Date(`${value}T00:00:00.000Z`);
    const to = new Date(from);
    to.setUTCDate(to.getUTCDate() + 1);
    return { dateFrom: from.toISOString(), dateTo: to.toISOString() };
  }
  const parts = value.split('-').map(Number);
  const year = parts[0] ?? new Date().getFullYear();
  const month = parts[1] ?? 1;
  const from = new Date(Date.UTC(year, month - 1, 1));
  const to = new Date(Date.UTC(year, month, 1));
  return { dateFrom: from.toISOString(), dateTo: to.toISOString() };
}

// Quản lý cộng tác viên — E4 (tài liệu bổ sung, thảo luận 2026-08-17, ngoài phạm vi 117 mục gốc).
export default function ContentOpsE4Page() {
  const [mode, setMode] = React.useState<RangeMode>('month');
  const [value, setValue] = React.useState(() => todayValue('month'));
  const { dateFrom, dateTo } = computeRange(mode, value);
  const { items, error, setError, reload } = useCollaborators(dateFrom, dateTo);
  const { savingId, lookupByPhone, markCollaborator, unmarkCollaborator, setKpiTarget } =
    useCollaboratorActions(reload, setError);

  return (
    <div>
      <RangeControls
        mode={mode}
        value={value}
        onModeChange={(m) => {
          setMode(m);
          setValue(todayValue(m));
        }}
        onValueChange={setValue}
      />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <AddCollaboratorForm
        onLookup={lookupByPhone}
        onMark={(id) => void markCollaborator(id)}
        saving={savingId !== null}
      />

      <div className="mt-4">
        <CollaboratorKpiTable
          items={items}
          savingId={savingId}
          onUnmark={(id) => void unmarkCollaborator(id)}
          onSetTarget={(id, target) => void setKpiTarget(id, target)}
        />
      </div>
    </div>
  );
}

function RangeControls({
  mode,
  value,
  onModeChange,
  onValueChange,
}: {
  mode: RangeMode;
  value: string;
  onModeChange: (m: RangeMode) => void;
  onValueChange: (v: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-2">
      <div className="flex gap-1">
        {(['day', 'month'] as RangeMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`rounded-md px-3 py-1.5 text-xs ${
              mode === m
                ? 'bg-stone-900 font-semibold text-white'
                : 'border border-stone-200 text-stone-700'
            }`}
          >
            {m === 'day' ? 'Theo ngày' : 'Theo tháng'}
          </button>
        ))}
      </div>
      <input
        type={mode === 'day' ? 'date' : 'month'}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="border-border rounded-md border px-3 py-2 text-sm"
      />
    </div>
  );
}
