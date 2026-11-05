// Chạy: pnpm test (node --test, không cần thêm thư viện test cho web).
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { androidAssetLinks, appleAppSiteAssociation, verificationResponse } from './appLinks.ts';

const SHA = Array(32).fill('AB').join(':');

test('AASA: đúng appID = Team ID + bundle id, gồm /p/* và /u/*', () => {
  const { applinks } = appleAppSiteAssociation(' ABCDE12345 ');
  assert.deepEqual(applinks.details[0].appIDs, ['ABCDE12345.vn.phominh.app']);
  assert.equal(applinks.details[0].appID, 'ABCDE12345.vn.phominh.app');
  assert.deepEqual(applinks.details[0].paths, ['/p/*', '/u/*']);
  assert.deepEqual(applinks.details[0].components, [{ '/': '/p/*' }, { '/': '/u/*' }]);
});

test('AASA: thiếu hoặc sai định dạng Team ID thì null', () => {
  for (const value of [undefined, '', '  ', 'abc', 'abcde12345', 'ABCDE123456']) {
    assert.equal(appleAppSiteAssociation(value), null);
  }
});

test('assetlinks: đúng package, nhận nhiều vân tay, tự viết hoa', () => {
  const lower = SHA.toLowerCase();
  const other = Array(32).fill('CD').join(':');
  const [entry] = androidAssetLinks(`${lower}, ${other}`);
  assert.deepEqual(entry.relation, ['delegate_permission/common.handle_all_urls']);
  assert.equal(entry.target.package_name, 'vn.phominh.app');
  assert.deepEqual(entry.target.sha256_cert_fingerprints, [SHA, other]);
});

test('assetlinks: thiếu hoặc có 1 vân tay sai thì null', () => {
  for (const value of [undefined, '', ' , ', 'AB:CD', `${SHA},xyz`]) {
    assert.equal(androidAssetLinks(value), null);
  }
});

test('phản hồi: có nội dung là JSON 200, không có là 404', async () => {
  const ok = verificationResponse({ a: 1 });
  assert.equal(ok.status, 200);
  assert.match(ok.headers.get('content-type'), /^application\/json/);
  assert.deepEqual(await ok.json(), { a: 1 });
  assert.equal(verificationResponse(null).status, 404);
});
