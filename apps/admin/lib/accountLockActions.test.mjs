// Chạy: pnpm test (node --test, không cần thêm thư viện test cho web).
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { lockActions, restrictedUntilFor } from './accountLockActions.ts';

const labels = (status) => lockActions(status).map((action) => action.label);

test('đang hoạt động: hạn chế 7/30 ngày hoặc khoá, không có Mở lại', () => {
  assert.deepEqual(labels('active'), ['Hạn chế 7 ngày', 'Hạn chế 30 ngày', 'Khoá vĩnh viễn']);
});

test('đang hạn chế: đổi thời hạn, khoá thẳng hoặc mở lại', () => {
  assert.deepEqual(labels('restricted'), [
    'Đổi thành hạn chế 7 ngày',
    'Đổi thành hạn chế 30 ngày',
    'Khoá vĩnh viễn',
    'Mở lại',
  ]);
});

test('đang khoá: chỉ Mở lại', () => {
  assert.deepEqual(labels('banned'), ['Mở lại']);
});

test('chỉ Mở lại là không cần lý do', () => {
  for (const status of ['active', 'restricted', 'banned']) {
    for (const action of lockActions(status)) {
      assert.equal(action.needsReason, action.status !== 'active');
    }
  }
});

test('thời hạn tính từ lúc bấm; khoá và mở lại không có thời hạn', () => {
  const now = Date.UTC(2026, 10, 5);
  const [seven, thirty, ban, reopen] = lockActions('restricted');
  assert.equal(restrictedUntilFor(seven, now), '2026-11-12T00:00:00.000Z');
  assert.equal(restrictedUntilFor(thirty, now), '2026-12-05T00:00:00.000Z');
  assert.equal(restrictedUntilFor(ban, now), undefined);
  assert.equal(restrictedUntilFor(reopen, now), undefined);
});
