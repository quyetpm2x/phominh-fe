'use client';

import { cn } from '@pho-minh/ui';
import Link from 'next/link';
import * as React from 'react';

import { GTABS, G_TAB_IDS } from '@/lib/mock/analytics';

const RANGES = ['7 ngày', '30 ngày', '90 ngày', 'Tùy chọn…'];
const AREAS = ['Tất cả khu', 'Bến Nghé', 'Tân Định', 'Bình Thạnh', 'Thủ Đức'];

// Thanh tab G1-G8 + bộ lọc khoảng thời gian/khu vực — ported từ gTabs/gRanges/gAreas trong
// Admin.dc.html. Mock gốc không thật sự lọc lại dữ liệu theo lựa chọn này, chỉ đổi trạng thái
// hiển thị — giữ nguyên hành vi đó (dữ liệu tĩnh).
export function AnalyticsChrome({ current }: { current: string }) {
  return (
    <>
      <TabStrip current={current} />
      <FilterRow />
    </>
  );
}

function TabStrip({ current }: { current: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {G_TAB_IDS.map((id) => (
        <Link
          key={id}
          href={`/analytics/${id.toLowerCase()}`}
          className={cn(
            'whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs',
            id === current
              ? 'bg-stone-900 font-semibold text-white'
              : 'border border-stone-200 text-stone-700',
          )}
        >
          {GTABS[id].tab}
        </Link>
      ))}
    </div>
  );
}

function FilterRow() {
  return (
    <div className="border-border bg-background mt-3 flex flex-wrap items-center gap-2.5 rounded-lg border px-3 py-2.5">
      <RangeFilter />
      <span className="h-6 w-px bg-stone-200" />
      <AreaFilter />
      <span className="flex-1" />
      <div className="border-border rounded-md border px-3 py-1.5 text-xs text-stone-700">
        Xuất CSV
      </div>
      <div className="border-border rounded-md border px-3 py-1.5 text-xs text-stone-700">
        Xuất Excel
      </div>
    </div>
  );
}

function RangeFilter() {
  const [range, setRange] = React.useState('30 ngày');

  return (
    <>
      <span className="pl-0.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
        Khoảng thời gian
      </span>
      <div className="flex gap-0.5 rounded-md bg-stone-100 p-0.5">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs',
              r === range ? 'bg-stone-900 font-semibold text-white' : 'text-stone-700',
            )}
          >
            {r}
          </button>
        ))}
      </div>
    </>
  );
}

function AreaFilter() {
  const [open, setOpen] = React.useState(false);
  const [area, setArea] = React.useState('Tất cả khu');

  return (
    <>
      <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">Khu vực</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="border-border flex h-8 items-center gap-2 whitespace-nowrap rounded-md border px-3 text-xs font-medium"
        >
          {area}
          <span className="text-xs text-stone-500">▼</span>
        </button>
        {open && (
          <div className="border-border absolute left-0 top-9 z-20 w-52 overflow-hidden rounded-md border bg-white shadow-lg">
            {AREAS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setArea(a);
                  setOpen(false);
                }}
                className={cn(
                  'block w-full border-t border-stone-100 px-3.5 py-2 text-left text-xs first:border-0',
                  a === area && 'text-primary font-semibold',
                )}
              >
                {a}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
