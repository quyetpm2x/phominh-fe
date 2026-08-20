import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface DayBusinessHour {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface PhoneVisibilityMonitorItem {
  id: string;
  businessName: string;
  phoneVisibility: 'always' | 'business_hours' | 'hidden';
  // Lịch theo từng thứ (mục 43) — mảng rỗng khi phoneVisibility='business_hours' nghĩa là merchant
  // chưa đặt ngày nào, đang ẩn số cả tuần trên thực tế dù đã chọn chế độ này.
  businessHours: DayBusinessHour[];
  alwaysVisibleForDays: number | null;
}

// Giám sát ẩn/hiện SĐT theo giờ (tai-lieu-chuc-nang.md #99) — dữ liệu THẬT, trước đây chỉ có route
// tự-đổi của merchant, không route admin nào đọc lại để giám sát.
export function usePhoneVisibilityMonitor() {
  const router = useRouter();
  const [items, setItems] = React.useState<PhoneVisibilityMonitorItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void (async () => {
      try {
        const data = await adminFetch<PhoneVisibilityMonitorItem[]>(
          '/api/admin/merchants/phone-visibility-monitor',
        );
        setItems(data);
      } catch (err) {
        if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
          router.push('/login');
          return;
        }
        setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
      }
    })();
  }, [router]);

  return { items, error };
}
