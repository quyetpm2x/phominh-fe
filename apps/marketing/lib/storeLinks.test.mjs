import assert from 'node:assert/strict';
import { test } from 'node:test';

import { storeLinks } from './storeLinks.ts';

test('có link https thì giữ, chưa có hoặc link sai thì null', () => {
  assert.deepEqual(storeLinks(' https://apps.apple.com/app/id1 ', undefined), [
    { name: 'App Store', href: 'https://apps.apple.com/app/id1' },
    { name: 'Google Play', href: null },
  ]);
  for (const bad of ['', '   ', '#', 'javascript:alert(1)', 'http://x.vn']) {
    assert.equal(storeLinks(bad, bad)[0].href, null);
  }
});
