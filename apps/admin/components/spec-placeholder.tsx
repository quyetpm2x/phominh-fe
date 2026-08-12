import type { PlaceholderScreen } from '@/lib/mock/placeholders';

// Card mô tả cho 12 màn hình mock gốc (Admin.dc.html) chưa từng thiết kế UI thật, chỉ có
// tiêu đề + mô tả + danh sách thành phần dự kiến. Giữ nguyên fidelity đó thay vì bịa UI.
export function SpecPlaceholder({ screen }: { screen: PlaceholderScreen }) {
  return (
    <div className="border-border bg-background max-w-3xl rounded-lg border p-6">
      <div className="text-foreground text-base font-semibold">{screen.name}</div>
      <p className="mt-2.5 text-sm leading-relaxed text-stone-700">{screen.spec}</p>
      <div className="border-border mt-5 border-t pt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Thành phần chính của màn hình
        </div>
        <ul className="mt-2.5 flex flex-col gap-2">
          {screen.parts.map((part) => (
            <li
              key={part}
              className="text-foreground flex items-start gap-2.5 text-sm leading-relaxed"
            >
              <span className="bg-primary mt-1.5 h-1.5 w-1.5 flex-none rounded-full" />
              {part}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
