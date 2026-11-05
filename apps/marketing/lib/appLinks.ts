// Universal Links (iOS) / App Links (Android): 2 file xác minh để link https://phominh.vn/p/:id và /u/:id tự mở app.
// Bundle id / package khớp web-app/app/app.json. Team ID, vân tay chứng chỉ đọc từ env; thiếu hoặc sai định dạng thì
// trả null (route trả 404), không bịa giá trị. Không import gì để test chạy thẳng bằng node --test.
export const APP_ID = 'vn.phominh.app';
const SHARED_PATHS = ['/p/*', '/u/*'];

const APPLE_TEAM_ID = /^[A-Z0-9]{10}$/;
const SHA256_FINGERPRINT = /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/;

export function appleAppSiteAssociation(teamId: string | undefined): object | null {
  const team = teamId?.trim();
  if (!team || !APPLE_TEAM_ID.test(team)) return null;
  const appId = `${team}.${APP_ID}`;
  return {
    applinks: {
      // `appIDs`/`components` cho iOS 13+, `apps`/`appID`/`paths` cho bản cũ hơn.
      apps: [],
      details: [
        {
          appID: appId,
          appIDs: [appId],
          paths: SHARED_PATHS,
          components: SHARED_PATHS.map((path) => ({ '/': path })),
        },
      ],
    },
  };
}

/** `fingerprints`: 1 hoặc nhiều vân tay SHA-256 cách nhau dấu phẩy (vd chứng chỉ Play App Signing + upload). */
export function androidAssetLinks(fingerprints: string | undefined): object[] | null {
  const list = (fingerprints ?? '')
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
  if (list.length === 0 || !list.every((item) => SHA256_FINGERPRINT.test(item))) return null;
  return [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: { namespace: 'android_app', package_name: APP_ID, sha256_cert_fingerprints: list },
    },
  ];
}

/** Trả file xác minh dạng JSON; chưa cấu hình thì 404. */
export function verificationResponse(body: object | null): Response {
  return body ? Response.json(body) : new Response('Not Found', { status: 404 });
}
