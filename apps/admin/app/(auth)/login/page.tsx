'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminLogin, getAdminToken, getMe } from '@/lib/adminApi';

// Đăng nhập admin — A1 (tài liệu nghiệp vụ). ĐÃ NỐI backend thật (POST /api/admin/auth/login,
// AdminService.login — bcrypt + JWT ký riêng, không qua OTP Supabase). Bỏ bước 2FA giả lập của
// bản mock gốc vì backend hiện CHƯA implement 2FA thật — hiện fake UI xác thực 2 lớp trong khi
// không thật sự verify gì là hành vi lừa dối, không giữ lại.
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  // Đã đăng nhập từ trước (còn cookie hợp lệ) mà vẫn vào /login → đẩy thẳng về dashboard, không
  // hiện lại form. Xác thực bằng GET /api/admin/me thay vì chỉ tin cookie còn tồn tại, vì cookie
  // có thể đã hết hạn phía backend dù max-age phía trình duyệt chưa tới (lệch giờ, token bị thu hồi...).
  const [checkingSession, setCheckingSession] = React.useState(true);

  React.useEffect(() => {
    if (!getAdminToken()) {
      setCheckingSession(false);
      return;
    }
    void getMe()
      .then(() => router.replace('/'))
      .catch(() => setCheckingSession(false));
  }, [router]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await adminLogin(email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) return null;

  return (
    <div className="bg-background text-foreground flex h-screen">
      <LoginBrandPanel />
      <div className="flex flex-1 items-center justify-center p-10">
        <LoginForm
          email={email}
          password={password}
          error={error}
          loading={loading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={signIn}
        />
      </div>
    </div>
  );
}

function LoginBrandPanel() {
  return (
    <div className="flex w-5/12 flex-col bg-stone-900 px-12 py-11 text-white">
      <div className="flex items-center gap-3">
        <div className="bg-admin-green flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold">
          P
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Phố Mình</div>
          <div className="mt-0.5 font-mono text-xs text-white/45">ADMIN CONSOLE</div>
        </div>
      </div>

      <div className="flex max-w-md flex-1 flex-col justify-center">
        <div className="text-3xl font-bold leading-tight tracking-tight">
          Khu vực dành cho đội vận hành
        </div>
        <div className="mt-3.5 text-sm leading-relaxed text-white/60">
          Cổng đăng nhập này tách biệt hoàn toàn khỏi luồng OTP của người dùng thường. Tài khoản do
          đội vận hành cấp thủ công, không tự đăng ký.
        </div>
      </div>

      <div className="font-mono text-xs text-white/35">A1 · ADMIN AUTH · v2.5.0</div>
    </div>
  );
}

function LoginForm({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="w-96">
      <div className="text-xl font-bold tracking-tight">Đăng nhập</div>
      <div className="mt-1.5 text-sm text-stone-600">
        Dùng email nội bộ được cấp cho đội vận hành.
      </div>

      <div className="mt-6 flex flex-col gap-3.5">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-stone-700">Email nội bộ</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="ten@phominh.vn"
            className="border-border h-11 rounded-lg border bg-white px-3.5 text-sm"
          />
        </label>
        <PasswordField value={password} onChange={onPasswordChange} />

        {error ? <div className="text-destructive text-sm">{error}</div> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-12 items-center justify-center rounded-xl bg-stone-900 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
        </button>
      </div>
    </form>
  );
}

function PasswordField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [show, setShow] = React.useState(false);

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-stone-700">Mật khẩu</span>
      <div className="border-border flex h-11 items-center rounded-lg border bg-white px-3.5">
        <input
          type={show ? 'text' : 'password'}
          required
          minLength={8}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-primary text-xs font-medium"
        >
          {show ? 'Ẩn' : 'Hiện'}
        </button>
      </div>
    </label>
  );
}
