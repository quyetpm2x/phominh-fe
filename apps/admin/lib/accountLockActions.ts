// Các nút xử lý tài khoản ở màn C5 theo trạng thái hiện tại. Không import gì để test chạy thẳng bằng node --test.
export type AccountStatus = 'active' | 'banned' | 'restricted';

export interface LockAction {
  label: string;
  status: AccountStatus;
  /** Hạn chế bao nhiêu ngày kể từ lúc bấm. */
  restrictDays?: number;
  needsReason: boolean;
  danger?: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function restrictActions(prefix: string): LockAction[] {
  return [7, 30].map((days) => ({
    label: `${prefix} ${days} ngày`,
    status: 'restricted',
    restrictDays: days,
    needsReason: true,
  }));
}

const BAN: LockAction = {
  label: 'Khoá vĩnh viễn',
  status: 'banned',
  needsReason: true,
  danger: true,
};
const REOPEN: LockAction = { label: 'Mở lại', status: 'active', needsReason: false };

// Đang hoạt động: hạn chế hoặc khoá. Đang hạn chế: đổi thời hạn (tính lại từ lúc bấm), khoá hẳn hoặc mở lại. Đang khoá: chỉ mở lại.
export function lockActions(status: AccountStatus): LockAction[] {
  if (status === 'banned') return [REOPEN];
  if (status === 'restricted') return [...restrictActions('Đổi thành hạn chế'), BAN, REOPEN];
  return [...restrictActions('Hạn chế'), BAN];
}

export function restrictedUntilFor(action: LockAction, now: number): string | undefined {
  return action.restrictDays
    ? new Date(now + action.restrictDays * DAY_MS).toISOString()
    : undefined;
}
