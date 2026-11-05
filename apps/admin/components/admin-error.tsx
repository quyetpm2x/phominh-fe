export function AdminError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="border-admin-red-soft-border bg-admin-red-soft text-admin-red mb-4 rounded-lg border px-4 py-3 text-sm">
      {message}
    </div>
  );
}
