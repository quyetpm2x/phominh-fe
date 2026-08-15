import type { ReportStatus } from '../hooks/useReportQueue';

import type { Tone } from './types';

export const STATUS_LABEL: Record<ReportStatus, string> = {
  pending: 'Chờ xử lý',
  reviewed: 'Đang xem xét',
  actioned: 'Đã xử lý',
  dismissed: 'Đã bác',
};

export const STATUS_TONE: Record<ReportStatus, Tone> = {
  pending: 'warn',
  reviewed: 'neutral',
  actioned: 'bad',
  dismissed: 'ok',
};
