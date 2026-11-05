import type { ActualCostRow } from '@/app/(dashboard)/analytics/_components/actual-costs';
import { useAdminResource } from '@/hooks/useAdminResource';

export interface CostEstimateReport {
  windowDays: number;
  smsCostVnd: number;
  smsCount: number;
  storageCostVndPerMonth: number;
  imageCount: number;
  visionApiCostVnd: number;
  totalCostVnd: number;
  activeUsers: number;
  costPerActiveUserVnd: number | null;
  isEstimate: true;
  actualCosts: ActualCostRow[];
}

// Chi phí vận hành G8 (tai-lieu-chuc-nang.md #110) — backend tự chặn 403 nếu không phải Owner
// (OwnerOnlyGuard), lỗi đó hiện thẳng qua `error` bên dưới, không cần tự kiểm tra isOwner ở FE.
export function useCostEstimate() {
  const { data, error, reload } = useAdminResource<CostEstimateReport>(
    '/api/admin/analytics/cost-estimate',
  );
  return { report: data, error, reload: () => void reload() };
}
