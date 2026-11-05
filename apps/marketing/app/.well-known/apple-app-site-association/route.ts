import { appleAppSiteAssociation, verificationResponse } from '../../../lib/appLinks';

// Đọc env lúc chạy, không đóng băng lúc build.
export const dynamic = 'force-dynamic';

export function GET(): Response {
  return verificationResponse(appleAppSiteAssociation(process.env.APPLE_TEAM_ID));
}
