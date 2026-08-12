import Link from 'next/link';

import { Pill } from '@/components/pill';
import { ScreenAccessGuard } from '@/components/screen-banner';
import { AREA_HEALTH, KPIS, NSM, QUEUES } from '@/lib/mock/dashboard';

// Dashboard tổng quan — A2 (tài liệu nghiệp vụ).
export default function DashboardPage() {
  return (
    <ScreenAccessGuard screen="A2">
      <KpiGrid />
      <div className="mt-4 grid grid-cols-12 gap-4">
        <NsmCard />
        <QueueList />
      </div>
      <AreaHealthTable />
    </ScreenAccessGuard>
  );
}

function KpiGrid() {
  return (
    <div className="grid grid-cols-5 gap-3.5">
      {KPIS.map((k) => (
        <div key={k.label} className="border-border bg-background rounded-lg border p-4">
          <div className="min-h-8 text-sm leading-snug text-stone-600">{k.label}</div>
          <div className="mt-1.5 text-3xl font-bold tracking-tight">{k.value}</div>
          <div className="mt-1 text-xs text-stone-700">{k.delta}</div>
        </div>
      ))}
    </div>
  );
}

function NsmCard() {
  const maxBar = Math.max(...NSM.series);

  return (
    <div className="border-border bg-background col-span-7 rounded-lg border p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-semibold">Chỉ số Bắc Đẩu — G1</div>
        <div className="text-xs text-stone-600">30 ngày qua</div>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-stone-700">
        Tỷ lệ % số lần mở app mà người dùng thấy ít nhất 1 bài đăng mới trong bán kính của họ.
      </p>
      <div className="mt-4 flex items-end gap-3.5">
        <div className="text-5xl font-bold tracking-tight">{NSM.value}%</div>
        <div className="text-primary pb-2 text-sm font-medium">{NSM.delta}</div>
      </div>
      <div className="mt-4 flex h-24 items-end gap-1">
        {NSM.series.map((v, i) => (
          <div key={`${i}-${v}`} className="flex h-full flex-1 flex-col justify-end">
            <div
              className="bg-admin-green-soft-border w-full rounded-t"
              style={{ height: `${Math.round((v / maxBar) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-xs text-stone-500">
        <span>08/07</span>
        <span>{NSM.band}</span>
        <span>06/08</span>
      </div>
    </div>
  );
}

function QueueList() {
  return (
    <div className="border-border bg-background col-span-5 rounded-lg border p-5 pb-2">
      <div className="text-sm font-semibold">Hàng đợi cần xử lý</div>
      <div className="mt-3">
        {QUEUES.map((q) => (
          <Link
            key={q.id}
            href={q.href}
            className="flex items-center gap-2.5 border-b border-stone-100 py-2.5 last:border-0"
          >
            <span className="w-6 flex-none font-mono text-xs text-stone-500">{q.id}</span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm leading-snug">{q.name}</span>
              <span className="text-xs text-stone-600">{q.age}</span>
            </span>
            <Pill tone={q.tone}>{q.count}</Pill>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AreaHealthTable() {
  return (
    <div className="border-border bg-background mt-4 overflow-hidden rounded-lg border">
      <div className="flex items-baseline justify-between border-b border-stone-100 px-5 py-4">
        <div className="text-sm font-semibold">Sức khỏe nội dung theo khu vực — G2</div>
        <Link href="/analytics/g2" className="text-primary text-xs font-medium">
          Xem đầy đủ phân tích →
        </Link>
      </div>
      <div className="grid grid-cols-12 gap-2 border-b border-stone-100 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        <div className="col-span-5">Khu vực</div>
        <div className="col-span-2">Bài mới/ngày</div>
        <div className="col-span-2">% thời gian feed trống</div>
        <div className="col-span-2">Tuổi TB khi xem</div>
        <div className="col-span-1">Trạng thái</div>
      </div>
      {AREA_HEALTH.map((a) => (
        <div
          key={a.name}
          className="border-stone-75 grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm last:border-0"
        >
          <div className="col-span-5 font-medium">{a.name}</div>
          <div className="col-span-2">{a.posts}</div>
          <div className="col-span-2">{a.empty}</div>
          <div className="col-span-2">{a.age}</div>
          <div className="col-span-1">
            <Pill tone={a.tone}>{a.status}</Pill>
          </div>
        </div>
      ))}
    </div>
  );
}
