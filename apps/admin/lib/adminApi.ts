'use client';

// Gọi thẳng backend NestJS từ trình duyệt (khác web marketing — server action nên không cần
// CORS; ở đây admin panel chạy client-side nên backend đã bật CORS riêng cho origin này, xem
// main.ts ADMIN_APP_URL). Token lưu ở cookie client-đọc-được (không httpOnly) — cùng mức đơn giản
// với cookie admin_access_token gốc app-shell.tsx đã dùng (document.cookie), chỉ đổi nội dung từ
// chuỗi "demo" giả sang JWT thật.
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? 'http://localhost:3000';
const TOKEN_COOKIE = 'admin_access_token';

interface Envelope<T> {
  data: T;
}

interface ErrorBody {
  message?: string | string[];
}

export function getAdminToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )admin_access_token=([^;]*)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

function setAdminToken(token: string): void {
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=28800`;
}

export function clearAdminToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}

export class AdminApiError extends Error {}

export interface AdminInfo {
  id: string;
  email: string;
  name: string;
  isOwner: boolean;
}

// Xác thực riêng biệt, không dùng chung OTP user thường (bussiness §9.1 A1) — POST /api/admin/auth/login.
export async function adminLogin(email: string, password: string): Promise<AdminInfo> {
  const res = await fetch(`${BACKEND_API_URL}/api/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = (await res.json().catch(() => null)) as Envelope<{
    accessToken: string;
    admin: AdminInfo;
  }> | null;

  if (!res.ok || !body) {
    const message = (body as unknown as ErrorBody | null)?.message;
    throw new AdminApiError(
      Array.isArray(message) ? message.join(', ') : (message ?? 'Sai email hoặc mật khẩu'),
    );
  }

  setAdminToken(body.data.accessToken);
  return body.data.admin;
}

// Dùng cho mọi route /api/admin/* cần Bearer token — ném AdminApiError khi 401/403/lỗi khác,
// để nơi gọi tự quyết định điều hướng lại /login hay hiện thông báo thiếu quyền.
export async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  if (!token) throw new AdminApiError('Chưa đăng nhập admin');

  const res = await fetch(`${BACKEND_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearAdminToken();
    throw new AdminApiError('Phiên đăng nhập đã hết hạn — đăng nhập lại');
  }

  const body = (await res.json().catch(() => null)) as Envelope<T> | ErrorBody | null;
  if (!res.ok) {
    const message = (body as ErrorBody | null)?.message;
    throw new AdminApiError(
      Array.isArray(message) ? message.join(', ') : (message ?? 'Có lỗi xảy ra, thử lại sau.'),
    );
  }
  return (body as Envelope<T>).data;
}

export function getMe(): Promise<AdminInfo> {
  return adminFetch<AdminInfo>('/api/admin/me');
}

export function changeAdminPassword(currentPassword: string, newPassword: string): Promise<void> {
  return adminFetch('/api/admin/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
