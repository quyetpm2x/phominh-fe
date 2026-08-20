'use client';

import * as React from 'react';

import type { CollaboratorStatsItem } from '@/hooks/useCollaborators';

function kpiCell(count: number, target: number): string {
  if (target === 0) return `${count}`;
  return `${count}/${target} (${Math.round((count / target) * 100)}%)`;
}

// Bảng KPI cộng tác viên (tài liệu bổ sung, thảo luận 2026-08-17) — số liệu thật đếm từ
// Post/Vote/Comment theo khoảng ngày đang xem, mục tiêu do admin tự đặt (không lưu sẵn %).
export function CollaboratorKpiTable({
  items,
  savingId,
  onUnmark,
  onSetTarget,
}: {
  items: CollaboratorStatsItem[] | null;
  savingId: string | null;
  onUnmark: (userId: string) => void;
  onSetTarget: (
    userId: string,
    target: { postsTarget: number; votesTarget: number; commentsTarget: number },
  ) => void;
}) {
  const [editingId, setEditingId] = React.useState<string | null>(null);

  if (items === null) return <div className="text-sm text-stone-600">Đang tải…</div>;
  if (items.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
        Chưa có cộng tác viên nào.
      </div>
    );
  }

  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border">
      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-3">Cộng tác viên</div>
        <div className="col-span-2">Bài đăng</div>
        <div className="col-span-2">Vote</div>
        <div className="col-span-2">Bình luận</div>
        <div className="col-span-1">Giờ hoạt động nhiều nhất</div>
        <div className="col-span-2" />
      </div>
      {items.map((item) => (
        <CollaboratorRow
          key={item.id}
          item={item}
          editing={editingId === item.id}
          saving={savingId === item.id}
          onToggleEdit={() => setEditingId(editingId === item.id ? null : item.id)}
          onUnmark={() => onUnmark(item.id)}
          onSaveTarget={(target) => {
            onSetTarget(item.id, target);
            setEditingId(null);
          }}
        />
      ))}
    </div>
  );
}

function CollaboratorRow({
  item,
  editing,
  saving,
  onToggleEdit,
  onUnmark,
  onSaveTarget,
}: {
  item: CollaboratorStatsItem;
  editing: boolean;
  saving: boolean;
  onToggleEdit: () => void;
  onUnmark: () => void;
  onSaveTarget: (target: {
    postsTarget: number;
    votesTarget: number;
    commentsTarget: number;
  }) => void;
}) {
  return (
    <div className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0">
      <div className="col-span-3">
        <span className="block font-medium">{item.alias}</span>
        <span className="block font-mono text-xs text-stone-600">{item.phoneNumber}</span>
      </div>
      <div className="col-span-2 font-mono">{kpiCell(item.postsCount, item.postsTarget)}</div>
      <div className="col-span-2 font-mono">{kpiCell(item.votesCount, item.votesTarget)}</div>
      <div className="col-span-2 font-mono">{kpiCell(item.commentsCount, item.commentsTarget)}</div>
      <div className="col-span-1 font-mono text-xs">
        {item.peakHour === null ? '—' : `${item.peakHour}h`}
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onToggleEdit}
          className="rounded-md border border-stone-300 px-2 py-1 text-xs font-medium"
        >
          {editing ? 'Đóng' : 'Mục tiêu'}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={onUnmark}
          className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-md border px-2 py-1 text-xs font-medium disabled:opacity-50"
        >
          Gỡ
        </button>
      </div>
      {editing ? (
        <TargetEditor item={item} saving={saving} onSave={onSaveTarget} onCancel={onToggleEdit} />
      ) : null}
    </div>
  );
}

function TargetEditor({
  item,
  saving,
  onSave,
  onCancel,
}: {
  item: CollaboratorStatsItem;
  saving: boolean;
  onSave: (target: { postsTarget: number; votesTarget: number; commentsTarget: number }) => void;
  onCancel: () => void;
}) {
  const [posts, setPosts] = React.useState(item.postsTarget);
  const [votes, setVotes] = React.useState(item.votesTarget);
  const [comments, setComments] = React.useState(item.commentsTarget);

  return (
    <div className="col-span-12 mt-3 flex flex-wrap items-end gap-2 border-t border-stone-100 pt-3">
      <NumberField label="Mục tiêu bài" value={posts} onChange={setPosts} />
      <NumberField label="Mục tiêu vote" value={votes} onChange={setVotes} />
      <NumberField label="Mục tiêu bình luận" value={comments} onChange={setComments} />
      <button
        type="button"
        disabled={saving}
        onClick={() => onSave({ postsTarget: posts, votesTarget: votes, commentsTarget: comments })}
        className="rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
      >
        {saving ? 'Đang lưu…' : 'Lưu'}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium"
      >
        Huỷ
      </button>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-stone-600">{label}</label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="border-border w-24 rounded-md border px-2 py-1.5 text-sm"
      />
    </div>
  );
}
