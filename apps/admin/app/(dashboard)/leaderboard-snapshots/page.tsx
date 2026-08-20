'use client';

import { useEffect, useState } from 'react';

import { Pill } from '@/components/pill';
import { useAdminLeaderboard, type LeaderboardSnapshotEntry } from '@/hooks/useAdminLeaderboard';

const TIER_OPTIONS = [0, 1, 2, 3, 4, 5, 6];

// Xem bảng xếp hạng thưởng đã chốt theo tháng (tai-lieu-chuc-nang.md #116, ScreenId I2) — trước đây
// route leaderboard chỉ có phía mobile. CHỈ XEM — không có hành động sửa số liệu/phát lại thưởng
// nào được mô tả trong tài liệu gốc.
export default function LeaderboardSnapshotsPage() {
  const { entries, error, loading, load } = useAdminLeaderboard();
  const [tier, setTier] = useState(0);
  const [period, setPeriod] = useState('');

  useEffect(() => {
    void load(tier);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier]);

  return (
    <div>
      <FilterBar
        tier={tier}
        setTier={setTier}
        period={period}
        setPeriod={setPeriod}
        loading={loading}
        onSearch={() => void load(tier, period)}
      />

      {error ? (
        <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
          <div className="col-span-1">Hạng</div>
          <div className="col-span-5">Người dùng</div>
          <div className="col-span-3">Điểm</div>
          <div className="col-span-3">Tiền thưởng</div>
        </div>
        <SnapshotBody entries={entries} />
      </div>
    </div>
  );
}

function FilterBar({
  tier,
  setTier,
  period,
  setPeriod,
  loading,
  onSearch,
}: {
  tier: number;
  setTier: (v: number) => void;
  period: string;
  setPeriod: (v: string) => void;
  loading: boolean;
  onSearch: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-2">
      <TierSelect tier={tier} setTier={setTier} />
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

function TierSelect({ tier, setTier }: { tier: number; setTier: (v: number) => void }) {
  return (
    <div>
      <label htmlFor="lb-tier" className="mb-1 block text-xs font-semibold text-stone-600">
        Bậc
      </label>
      <select
        id="lb-tier"
        value={tier}
        onChange={(e) => setTier(Number(e.target.value))}
        className="border-border rounded-md border px-3 py-2 text-sm"
      >
        {TIER_OPTIONS.map((t) => (
          <option key={t} value={t}>
            Bậc {t}
          </option>
        ))}
      </select>
    </div>
  );
}

function SnapshotBody({ entries }: { entries: LeaderboardSnapshotEntry[] | null }) {
  if (entries === null) return <div className="px-5 py-4 text-sm text-stone-600">Đang tải…</div>;
  if (entries.length === 0) {
    return (
      <div className="px-5 py-8 text-center text-sm text-stone-600">
        Chưa có kết quả xếp hạng cho bậc/kỳ này.
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
          <div className="col-span-5 font-medium">{entry.alias}</div>
          <div className="col-span-3 font-mono">{entry.score.toFixed(1)}</div>
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
