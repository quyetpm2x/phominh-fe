'use client';

import { useEffect, useState } from 'react';

import { Pill } from '@/components/pill';
import { useAdminLeaderboard, type LeaderboardSnapshotEntry } from '@/hooks/useAdminLeaderboard';

// Xem bảng xếp hạng thưởng đã chốt theo tháng (tai-lieu-chuc-nang.md #116, ScreenId I2) — trước đây
// route leaderboard chỉ có phía mobile. CHỈ XEM — không có hành động sửa số liệu/phát lại thưởng
// nào được mô tả trong tài liệu gốc. 1 bảng chung (2026-10-26), điểm = số người tin tưởng tăng ròng.
export default function LeaderboardSnapshotsPage() {
  const { entries, error, loading, load } = useAdminLeaderboard();
  const [period, setPeriod] = useState('');

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <FilterBar
        period={period}
        setPeriod={setPeriod}
        loading={loading}
        onSearch={() => void load(period)}
      />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-1">Hạng</div>
          <div className="col-span-5">Tên</div>
          <div className="col-span-3">Người tin tưởng tăng</div>
          <div className="col-span-3">Tiền thưởng</div>
        </div>
        <SnapshotBody entries={entries} />
      </div>
    </div>
  );
}

function FilterBar({
  period,
  setPeriod,
  loading,
  onSearch,
}: {
  period: string;
  setPeriod: (v: string) => void;
  loading: boolean;
  onSearch: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
        className="flex items-end gap-2"
      >
        <div>
          <label htmlFor="lb-period" className="mb-1 block text-xs font-semibold text-stone-600">
            Kỳ (YYYY-MM)
          </label>
          <input
            id="lb-period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            placeholder="Bỏ trống = kỳ vừa kết thúc"
            className="border-border rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Đang tải…' : 'Xem'}
        </button>
      </form>
    </div>
  );
}

function SnapshotBody({ entries }: { entries: LeaderboardSnapshotEntry[] | null }) {
  if (entries === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (entries.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">
        Chưa có kết quả xếp hạng cho kỳ này.
      </div>
    );
  }
  return (
    <>
      {entries.map((entry) => (
        <div
          key={entry.userId}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-1 font-mono font-semibold">#{entry.rank}</div>
          <div className="col-span-5 font-medium">{entry.name}</div>
          <div className="col-span-3 font-mono">{entry.score.toLocaleString('vi-VN')}</div>
          <div className="col-span-3">
            {entry.rewardAmount ? (
              <Pill tone="ok">{entry.rewardAmount.toLocaleString('vi-VN')}₫</Pill>
            ) : (
              <span className="text-stone-500">—</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
