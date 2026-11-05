import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

/** Lỗi gọi API thành câu hiển thị; phiên admin hết hạn thì chuyển về đăng nhập (trả null). */
export function useAdminErrorText() {
  const router = useRouter();
  return React.useCallback(
    (err: unknown): string | null => {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return null;
      }
      return err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ';
    },
    [router],
  );
}

/** Tải 1 tài nguyên GET; `path` null thì chưa tải. Lỗi giữ riêng để trang hiện lỗi thay vì số liệu rỗng. */
export function useAdminResource<T>(path: string | null) {
  const errorText = useAdminErrorText();
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  // Đổi bộ lọc khi lượt trước chưa xong: chỉ nhận kết quả của lượt mới nhất, kẻo số cũ đè số mới.
  const latest = React.useRef(0);
  const reload = React.useCallback(async () => {
    if (!path) return;
    const request = (latest.current += 1);
    setError(null);
    try {
      const result = await adminFetch<T>(path);
      if (request === latest.current) setData(result);
    } catch (err) {
      if (request === latest.current) setError(errorText(err));
    }
  }, [path, errorText]);
  React.useEffect(() => {
    setData(null);
    void reload();
  }, [reload]);
  return { data, error, reload };
}
