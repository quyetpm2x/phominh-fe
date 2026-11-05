export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border-border bg-background rounded-lg border p-5">
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-2 font-mono text-3xl font-semibold text-stone-900">{value}</div>
      {hint ? <div className="mt-1.5 text-xs text-stone-600">{hint}</div> : null}
    </div>
  );
}
