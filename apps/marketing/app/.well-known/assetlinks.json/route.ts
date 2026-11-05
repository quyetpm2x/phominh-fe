import { androidAssetLinks, verificationResponse } from '../../../lib/appLinks';

// Đọc env lúc chạy, không đóng băng lúc build.
export const dynamic = 'force-dynamic';

export function GET(): Response {
  return verificationResponse(androidAssetLinks(process.env.ANDROID_SHA256));
}
