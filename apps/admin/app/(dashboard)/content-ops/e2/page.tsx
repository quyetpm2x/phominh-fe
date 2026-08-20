'use client';

import { cn } from '@pho-minh/ui';
import { useState } from 'react';

import { usePilotAreas, type PilotAreaItem } from '@/hooks/usePilotAreas';

// Quản lý khu vực thí điểm — E2 (tai-lieu-chuc-nang.md #101). Dữ liệu THẬT từ bảng pilot_areas
// (bảng mới, chưa từng tồn tại trước phiên này — trước đó KHÔNG có khái niệm "khu vực chính thức"
// nào trong toàn bộ data model). isActive KHÔNG chặn feed/đăng bài thật — thuần cờ theo dõi nội bộ.
// Số liệu so sánh: 3 chỉ số tính động qua PostGIS (người dùng/bài đăng 30 ngày/merchant trong bán
// kính) — KHÔNG có "Retention D7" như bản mock gốc, vì cần cơ chế theo dõi cohort riêng chưa xây
// (liên quan mục 107 — sức khỏe khu vực — vẫn CHỈ CÓ MOCK FE), không bịa số liệu.
export default function ContentOpsE2Page() {
  const { areas, error, creating, togglingId, create, toggleActive } = usePilotAreas();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-stone-600">So sánh số liệu giữa các khu vực thí điểm.</div>
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white"
        >
          {formOpen ? 'Đóng' : 'Thêm khu vực'}
        </button>
      </div>

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      {formOpen ? (
        <CreateAreaForm
          creating={creating}
          onSubmit={async (input) => {
            if (await create(input)) setFormOpen(false);
          }}
        />
      ) : null}

      <AreaGrid areas={areas} togglingId={togglingId} onToggle={toggleActive} />
    </>
  );
}

function AreaGrid({
  areas,
  togglingId,
  onToggle,
}: {
  areas: PilotAreaItem[] | null;
  togglingId: string | null;
  onToggle: (id: string, isActive: boolean) => void;
}) {
  if (areas === null) return <div className="text-sm text-stone-600">Đang tải…</div>;
  if (areas.length === 0) {
    return (
      <div className="border-border bg-background rounded-lg border p-8 text-center text-sm text-stone-600">
        Chưa có khu vực thí điểm nào.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3.5">
      {areas.map((area) => (
        <AreaCard
          key={area.id}
          area={area}
          toggling={togglingId === area.id}
          onToggle={() => onToggle(area.id, !area.isActive)}
        />
      ))}
    </div>
  );
}

function AreaCard({
  area,
  toggling,
  onToggle,
}: {
  area: PilotAreaItem;
  toggling: boolean;
  onToggle: () => void;
}) {
  const stats = [
    { k: 'Người dùng', v: area.userCount },
    { k: 'Bài đăng 30 ngày', v: area.postCount },
    { k: 'Merchant', v: area.merchantCount },
  ];
  return (
    <div className="border-border bg-background rounded-lg border p-5">
      <div className="flex items-center gap-2.5">
        <div className="text-base font-semibold">{area.name}</div>
        <span className="flex-1" />
        <button
          type="button"
          disabled={toggling}
          onClick={onToggle}
          className={cn(
            'flex h-6 w-10 rounded-full p-0.5 disabled:opacity-50',
            area.isActive ? 'bg-admin-green justify-end' : 'justify-start bg-stone-300',
          )}
        >
          <span className="block h-5 w-5 rounded-full bg-white" />
        </button>
      </div>
      <div className="mt-1 text-xs text-stone-600">
        Mở từ {new Date(area.createdAt).toLocaleDateString('vi-VN')} · bán kính {area.radiusKm}km
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.k}>
            <div className="text-lg font-bold tracking-tight">{s.v.toLocaleString('vi-VN')}</div>
            <div className="mt-0.5 text-xs leading-snug text-stone-600">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreateAreaForm({
  creating,
  onSubmit,
}: {
  creating: boolean;
  onSubmit: (input: { name: string; lat: number; lng: number; radiusKm: number }) => void;
}) {
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radiusKm, setRadiusKm] = useState('2');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, lat: Number(lat), lng: Number(lng), radiusKm: Number(radiusKm) });
      }}
      className="border-border bg-background mb-4 grid grid-cols-5 gap-2 rounded-lg border p-4"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên khu vực"
        required
        className="border-border col-span-2 rounded-md border px-3 py-2 text-sm"
      />
      <CoordinateInput value={lat} onChange={setLat} placeholder="Vĩ độ (lat)" />
      <CoordinateInput value={lng} onChange={setLng} placeholder="Kinh độ (lng)" />
      <div className="flex gap-2">
        <input
          value={radiusKm}
          onChange={(e) => setRadiusKm(e.target.value)}
          placeholder="Bán kính km"
          type="number"
          step="0.1"
          min="0.5"
          max="20"
          required
          className="border-border w-full rounded-md border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={creating}
          className="flex-none rounded-md bg-stone-900 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {creating ? '…' : 'Tạo'}
        </button>
      </div>
    </form>
  );
}

function CoordinateInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="number"
      step="any"
      required
      className="border-border rounded-md border px-3 py-2 text-sm"
    />
  );
}
