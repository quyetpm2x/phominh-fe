import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Refresh qua Route Handler nội bộ vì access/refresh token nằm trong httpOnly cookie,
// JS phía client không đọc trực tiếp được (mục 6 tài liệu FE):
// Browser → POST /api/auth/refresh → Route Handler đọc cookie, gọi Supabase refresh → set lại cookie.
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('admin_refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'no_refresh_token' }, { status: 401 });
  }

  // TODO: gọi supabase.auth.refreshSession() thật khi cấu hình Supabase project sẵn sàng,
  // rồi set lại cookie admin_access_token/admin_refresh_token bằng cookieStore.set(...).
  return NextResponse.json({ error: 'not_implemented' }, { status: 501 });
}
