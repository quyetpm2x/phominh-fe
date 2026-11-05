import { useAdminResource } from '@/hooks/useAdminResource';
import type { ScreenId } from '@/lib/types';

export interface WorkQueue {
  id: ScreenId;
  count: number;
  oldestAt: string | null;
}

/** Số việc đang chờ theo từng màn hình, dùng cho A2 và số báo trên menu. */
export function useWorkQueues() {
  return useAdminResource<WorkQueue[]>('/api/admin/analytics/work-queues');
}
