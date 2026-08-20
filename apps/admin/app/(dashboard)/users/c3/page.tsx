import { Pill } from '@/components/pill';
import { CLUSTERS, type FraudCluster } from '@/lib/mock/users';

// Thông đồng vote — C3 (tài liệu nghiệp vụ).
export default function UsersC3Page() {
  return (
    <div className="flex flex-col gap-3.5">
      {CLUSTERS.map((c) => (
        <ClusterCard key={c.id} cluster={c} />
      ))}
    </div>
  );
}

function ClusterCard({ cluster: c }: { cluster: FraudCluster }) {
  return (
    <div className="border-border bg-background rounded-lg border p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-stone-600">{c.id}</span>
        <span className="text-sm font-semibold">
          {c.size} tài khoản · mật độ vote qua lại {c.density}
        </span>
        <Pill tone={c.tone}>{c.risk}</Pill>
        <span className="flex-1" />
        <span className="text-xs text-stone-600">phát hiện {c.found}</span>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {c.members.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-2 rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs"
          >
            <span className="font-medium">{m.name}</span>
            <span className="font-mono text-stone-600">{m.votes} vote</span>
          </div>
        ))}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-700">{c.note}</p>
      <div className="mt-3.5 flex gap-2">
        <button
          type="button"
          className="h-9 rounded-md bg-stone-900 px-3.5 text-xs font-semibold text-white"
        >
          Vô hiệu hóa điểm ảo
        </button>
        <button
          type="button"
          className="border-border h-9 rounded-md border px-3.5 text-xs font-medium"
        >
          Đánh dấu không phải thông đồng
        </button>
      </div>
    </div>
  );
}
