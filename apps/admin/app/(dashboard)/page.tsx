'use client';

import Link from 'next/link';

import { TrendLine, type TrendPoint } from './analytics/_components/trend-line';

import { AdminError } from '@/components/admin-error';
import { Pill } from '@/components/pill';
import { useAdminResource } from '@/hooks/useAdminResource';
import { useDashboardSummary } from '@/hooks/useDashboardSummary';
import { useWorkQueues, type WorkQueue } from '@/hooks/useWorkQueues';
import { screenHref } from '@/lib/nav';
import { screenName } from '@/lib/screens';
import type { Tone } from '@/lib/types';

const WINDOW_DAYS = 30;

interface FreshFeedRate {
  percentage: number | null;
  sessionsWithNewPost: number;
  totalSessions: number;
  trend: TrendPoint[];
}

type AreaStatus = 'healthy' | 'watch' | 'needs_seed' | 'no_data';

interface AreaHealth {
  areaId: string;
  name: string;
  snapshotDate: string | null;
  newPosts: number | null;
  emptyFeedPercent: number | null;
  avgPostAgeHours: number | null;
  status: AreaStatus;
}

const AREA_STATUS: Record<AreaStatus, { label: string; tone: Tone }> = {
  healthy: { label: 'Khoẻ', tone: 'ok' },
  watch: { label: 'Cần theo dõi', tone: 'warn' },
  needs_seed: { label: 'Cần bài mồi', tone: 'bad' },
  no_data: { label: 'Chưa đủ dữ liệu', tone: 'neutral' },
};

// Dashboard tổng quan — A2 (tài liệu nghiệp vụ, mục 85). Toàn bộ là dữ liệu thật; không có dữ liệu thì hiện "—".
export default function DashboardPage() {
  return (
    <>
      <KpiGrid />
      <div className="mt-4 grid grid-cols-12 gap-4">
        <FreshFeedCard />
        <QueueList />
      </div>
      <AreaHealthTable />
    </>
  );
}

function KpiGrid() {
  const { summary, error } = useDashboardSummary();

  if (error) {
    return (
      <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red rounded-lg border px-4 py-3 text-sm">
        {error}
      </div>
    );
  }
  if (!summary) return <div className="text-sm text-stone-600">Đang tải…</div>;

  const items = [
    { label: 'User mới hôm nay', value: summary.newUsersToday, hint: 'Tính theo ngày UTC' },
    { label: 'Bài đăng mới hôm nay', value: summary.newPostsToday, hint: 'Không tính bài đã gỡ' },
    { label: 'Report chờ xử lý', value: summary.pendingReports, hint: 'Trạng thái pending' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3.5">
      {items.map((k) => (
        <div key={k.label} className="border-border bg-background rounded-lg border p-4">
          <div className="min-h-8 text-sm leading-snug text-stone-600">{k.label}</div>
          <div className="mt-1.5 text-3xl font-bold tracking-tight">
            {k.value.toLocaleString('vi-VN')}
          </div>
          <div className="mt-1 text-xs text-stone-700">{k.hint}</div>
        </div>
      ))}
    </div>
  );
}

function FreshFeedCard() {
  const { data, error } = useAdminResource<FreshFeedRate>(
    `/api/admin/analytics/fresh-feed-rate?days=${WINDOW_DAYS}`,
  );

  return (
    <div className="border-border bg-background col-span-7 rounded-lg border p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-semibold">Tỉ lệ thấy bài mới — G1</div>
        <div className="text-xs text-stone-600">{WINDOW_DAYS} ngày qua</div>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-stone-700">
        Tỉ lệ lượt mở app mà người dùng thấy ít nhất 1 bài đăng mới trong bán kính của họ.
      </p>
      <AdminError message={error} />
      {data ? (
        <>
          <div className="mt-4 text-5xl font-bold tracking-tight">
            {data.percentage === null ? '—' : `${data.percentage.toFixed(1)}%`}
          </div>
          <div className="mb-3 mt-1 text-xs text-stone-600">
            {data.sessionsWithNewPost.toLocaleString('vi-VN')} /{' '}
            {data.totalSessions.toLocaleString('vi-VN')} lượt mở app
          </div>
          <TrendLine points={data.trend} label="% theo ngày" />
        </>
      ) : null}
    </div>
  );
}

function waitingText(oldestAt: string | null): string {
  if (!oldestAt) return 'Không có việc chờ';
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(oldestAt).getTime()) / 60000));
  if (minutes < 60) return `Cũ nhất ${minutes} phút`;
  if (minutes < 1440) return `Cũ nhất ${Math.floor(minutes / 60)} giờ`;
  return `Cũ nhất ${Math.floor(minutes / 1440)} ngày`;
}

function queueTone(queue: WorkQueue): Tone {
  return queue.count === 0 ? 'ok' : 'warn';
}

function QueueList() {
  const { data, error } = useWorkQueues();

  return (
    <div className="border-border bg-background col-span-5 rounded-lg border p-5 pb-2">
      <div className="text-sm font-semibold">Hàng đợi cần xử lý</div>
      <AdminError message={error} />
      <div className="mt-3">
        {(data ?? []).map((queue) => (
          <Link
            key={queue.id}
            href={screenHref(queue.id)}
            className="flex items-center gap-2.5 border-b border-stone-100 py-2.5 last:border-0"
          >
            <span className="w-6 flex-none font-mono text-xs text-stone-500">{queue.id}</span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm leading-snug">{screenName(queue.id)}</span>
              <span className="text-xs text-stone-600">{waitingText(queue.oldestAt)}</span>
            </span>
            <Pill tone={queueTone(queue)}>{queue.count.toLocaleString('vi-VN')}</Pill>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AreaHealthRow({ area }: { area: AreaHealth }) {
  const status = AREA_STATUS[area.status];
  return (
    <div className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0">
      <div className="col-span-4 font-medium">{area.name}</div>
      <div className="col-span-2">{area.newPosts ?? '—'}</div>
      <div className="col-span-2">
        {area.emptyFeedPercent === null ? '—' : `${area.emptyFeedPercent}%`}
      </div>
      <div className="col-span-2">
        {area.avgPostAgeHours === null ? '—' : `${area.avgPostAgeHours} giờ`}
      </div>
      <div className="col-span-2">
        <Pill tone={status.tone}>{status.label}</Pill>
      </div>
    </div>
  );
}

function AreaHealthTable() {
  const { data, error } = useAdminResource<AreaHealth[]>('/api/admin/analytics/area-health');

  return (
    <div className="border-border bg-background mt-4 overflow-hidden rounded-lg border">
      <div className="flex items-baseline justify-between border-b border-stone-100 px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Sức khoẻ nội dung theo khu vực — G2</div>
          <div className="mt-0.5 text-xs text-stone-600">Theo bản tổng hợp ngày gần nhất</div>
        </div>
        <Link href="/analytics/g2" className="text-primary text-xs font-medium">
          Xem đầy đủ phân tích →
        </Link>
      </div>
      <AdminError message={error} />
      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-4">Khu vực</div>
        <div className="col-span-2">Bài mới/ngày</div>
        <div className="col-span-2">Dòng tin trống</div>
        <div className="col-span-2">Tuổi TB khi xem</div>
        <div className="col-span-2">Trạng thái</div>
      </div>
      {data?.length === 0 ? (
        <p className="px-5 py-4 text-sm text-stone-600">Chưa có khu vực nào đang mở.</p>
      ) : null}
      {(data ?? []).map((area) => (
        <AreaHealthRow key={area.areaId} area={area} />
      ))}
    </div>
  );
}
