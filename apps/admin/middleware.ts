import { NextResponse, type NextRequest } from 'next/server';

// Kiểm tra JWT admin mỗi request (mục 1, 4 tài liệu FE). Token nằm trong httpOnly cookie,
// tách biệt hoàn toàn khỏi luồng JWT của user thường (NestJS tự ký riêng qua OTP/eSMS,
// không qua Supabase Auth — xem tai-lieu-cong-nghe-backend.md mục 6).
const PUBLIC_PATHS = ['/login'];

export function middleware(request: NextRequest) {
  const isPublic = PUBLIC_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));
  if (isPublic) return NextResponse.next();

  const token = request.cookies.get('admin_access_token')?.value;
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: verify chữ ký JWT thật khi backend NestJS công bố public key / secret dùng chung.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
