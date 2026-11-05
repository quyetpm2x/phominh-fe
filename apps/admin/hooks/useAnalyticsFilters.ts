import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import * as React from 'react';

export const RANGE_OPTIONS = [7, 30, 90] as const;

/** Bộ lọc thống kê lưu trên URL: giữ nguyên khi chuyển tab, tải lại trang, gửi link cho người khác. */
export function useAnalyticsFilters(defaultDays: number = 30) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = Number(params.get('days'));
  const days = (RANGE_OPTIONS as readonly number[]).includes(raw) ? raw : defaultDays;
  const areaId = params.get('area') ?? '';
  const update = React.useCallback(
    (key: 'days' | 'area', value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.replace(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router],
  );
  const query = `days=${days}${areaId ? `&areaId=${encodeURIComponent(areaId)}` : ''}`;
  return {
    days,
    areaId,
    query,
    setDays: (value: number) => update('days', String(value)),
    setArea: (id: string) => update('area', id),
  };
}
