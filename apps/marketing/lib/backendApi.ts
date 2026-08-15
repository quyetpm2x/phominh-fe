// Gọi backend NestJS từ Server Action (chạy trên Node, KHÔNG phải trình duyệt — không cần CORS).
// BACKEND_API_URL không có tiền tố NEXT_PUBLIC_ vì chỉ dùng phía server, không lộ ra client bundle.
const BACKEND_API_URL = process.env.BACKEND_API_URL ?? 'http://localhost:3000';

interface ErrorBody {
  message?: string | string[];
}

export type PostPublicLeadResult = { ok: true } | { ok: false; error: string };

// path KHÔNG có tiền tố /api/public/ (VD 'merchants', 'pilot-signups', 'contact').
export async function postPublicLead(path: string, body: unknown): Promise<PostPublicLeadResult> {
  try {
    const res = await fetch(`${BACKEND_API_URL}/api/public/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true };

    const data = (await res.json().catch(() => null)) as ErrorBody | null;
    const message = data?.message;
    const error = Array.isArray(message)
      ? message.join(', ')
      : (message ?? 'Có lỗi xảy ra, thử lại sau.');
    return { ok: false, error };
  } catch {
    return { ok: false, error: 'Không kết nối được máy chủ, thử lại sau.' };
  }
}
