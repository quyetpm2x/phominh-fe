import { Pill } from '@/components/pill';

// Màn hình của tính năng chưa chạy: nói rõ lý do và việc admin có thể làm thay, không hiện số liệu mẫu.
export function NotEnabledNotice({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-background max-w-2xl rounded-lg border p-6">
      <div className="flex items-center gap-2.5">
        <div className="text-base font-semibold">{title}</div>
        <Pill tone="neutral">Chưa bật</Pill>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-stone-700">{children}</p>
    </div>
  );
}
