import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface PilotAreaItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radiusKm: number;
  isActive: boolean;
  createdAt: string;
  userCount: number;
  postCount: number;
  merchantCount: number;
}

export interface CreatePilotAreaInput {
  name: string;
  lat: number;
  lng: number;
  radiusKm: number;
}

// Quản lý khu vực thí điểm (tai-lieu-chuc-nang.md #101) — dữ liệu THẬT từ bảng pilot_areas (mới),
// không phải mock AREAS[] cũ.
export function usePilotAreas() {
  const router = useRouter();
  const [areas, setAreas] = React.useState<PilotAreaItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [creating, setCreating] = React.useState(false);
  const [togglingId, setTogglingId] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<PilotAreaItem[]>('/api/admin/pilot-areas');
      setAreas(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function create(input: CreatePilotAreaInput): Promise<boolean> {
    setCreating(true);
    setError(null);
    try {
      await adminFetch('/api/admin/pilot-areas', { method: 'POST', body: JSON.stringify(input) });
      await load();
      return true;
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không tạo được khu vực');
      return false;
    } finally {
      setCreating(false);
    }
  }

  async function toggleActive(id: string, isActive: boolean): Promise<void> {
    setTogglingId(id);
    try {
      await adminFetch(`/api/admin/pilot-areas/${id}/active`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive }),
      });
      await load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không cập nhật được');
    } finally {
      setTogglingId(null);
    }
  }

  return { areas, error, creating, togglingId, create, toggleActive };
}
