'use client';

import { cn } from '@pho-minh/ui';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useAdminResource } from '@/hooks/useAdminResource';
import { RANGE_OPTIONS, useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import type { PilotAreaItem } from '@/hooks/usePilotAreas';

const TABS = [
  { id: 'G1', label: 'Thấy bài mới' },
  { id: 'G2', label: 'Nội dung' },
  { id: 'G3', label: 'Tăng trưởng' },
  { id: 'G4', label: 'Giữ chân' },
  { id: 'G5', label: 'Tương tác' },
  { id: 'G7', label: 'An toàn' },
  { id: 'G8', label: 'Chi phí' },
] as const;

// Thanh tab + bộ lọc thật. Chỉ hiện bộ lọc mà tab đó thật sự dùng, để không ai tưởng đang xem số đã lọc.
export function AnalyticsChrome({
  current,
  range = false,
  area = false,
  defaultDays,
}: {
  current: string;
  range?: boolean;
  area?: boolean;
  defaultDays?: number;
}) {
  return (
    <>
      <TabStrip current={current} />
      {range || area ? (
        <div className="mt-3">
          <AnalyticsFilters range={range} area={area} defaultDays={defaultDays} />
        </div>
      ) : null}
    </>
  );
}

function TabStrip({ current }: { current: string }) {
  const query = useSearchParams().toString();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {TABS.map(({ id, label }) => (
        <Link
          key={id}
          href={`/analytics/${id.toLowerCase()}${query ? `?${query}` : ''}`}
          className={cn(
            'whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs',
            id === current
              ? 'bg-stone-900 font-semibold text-white'
              : 'border border-stone-200 text-stone-700',
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export function AnalyticsFilters(props: { range?: boolean; area?: boolean; defaultDays?: number }) {
  const { days, areaId, setDays, setArea } = useAnalyticsFilters(props.defaultDays);
  const { data: areas } = useAdminResource<PilotAreaItem[]>(
    props.area ? '/api/admin/pilot-areas' : null,
  );
  return (
    <div className="border-border bg-background flex flex-wrap items-center gap-2.5 rounded-lg border px-3 py-2.5">
      {props.range ? (
        <div
          className="flex gap-0.5 rounded-md bg-stone-100 p-0.5"
          role="group"
          aria-label="Khoảng thời gian"
        >
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={option === days}
              onClick={() => setDays(option)}
              className={cn(
                'rounded px-3 py-1 text-xs',
                option === days ? 'bg-white font-semibold shadow-sm' : 'text-stone-600',
              )}
            >
              {option} ngày
            </button>
          ))}
        </div>
      ) : null}
      {props.area ? (
        <select
          aria-label="Khu vực"
          value={areaId}
          onChange={(event) => setArea(event.target.value)}
          className="border-border rounded-md border bg-white px-2.5 py-1.5 text-xs"
        >
          <option value="">Toàn hệ thống</option>
          {areas?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
              {item.isActive ? '' : ' (đã tắt)'}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}
