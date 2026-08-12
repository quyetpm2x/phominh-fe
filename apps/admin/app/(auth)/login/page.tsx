'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

// Đăng nhập admin — A1 (tài liệu nghiệp vụ). Chưa có backend admin-auth thật (api-sync: không
// có endpoint được generate cho luồng này), nên bước "Vào bảng điều khiển" chỉ set cookie demo
// admin_access_token mà middleware.ts đã kiểm tra sẵn, thay vì gọi API bịa ra.
export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<'creds' | 'twofa'>('creds');

  function signIn() {
    document.cookie = 'admin_access_token=demo; path=/; max-age=28800';
    router.push('/');
  }

  return (
    <div className="bg-background text-foreground flex h-screen">
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
            Cổng đăng nhập này tách biệt hoàn toàn khỏi luồng OTP của người dùng thường. Tài khoản
            do đội vận hành cấp thủ công, không tự đăng ký.
          </div>
          <div className="mt-6 flex flex-col gap-2.5">
            {[
              'Bắt buộc xác thực hai lớp qua ứng dụng authenticator',
              'Sai 5 lần liên tiếp sẽ khóa tạm tài khoản trong 15 phút',
              'Mọi phiên đăng nhập được ghi vào log truy cập F3',
            ].map((text) => (
              <div
                key={text}
                className="text-white/72 flex items-start gap-2.5 text-sm leading-relaxed"
              >
                <span className="bg-admin-green mt-1.5 h-1.5 w-1.5 flex-none rounded-full" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-xs text-white/35">A1 · ADMIN AUTH · v2.4.1</div>
      </div>

      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-96">
          {step === 'creds' ? (
            <CredsStep onContinue={() => setStep('twofa')} />
          ) : (
            <TwofaStep onBack={() => setStep('creds')} onSignIn={signIn} />
          )}
        </div>
      </div>
    </div>
  );
}

function CredsStep({ onContinue }: { onContinue: () => void }) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      <div className="text-xl font-bold tracking-tight">Đăng nhập</div>
      <div className="mt-1.5 text-sm text-stone-600">
        Dùng email nội bộ được cấp cho đội vận hành.
      </div>

      <div className="mt-6 flex flex-col gap-3.5">
        <div>
          <div className="mb-1.5 text-xs font-semibold text-stone-700">Email nội bộ</div>
          <div className="border-border flex h-11 items-center rounded-lg border bg-white px-3.5 text-sm">
            tham.nguyen@phominh.vn
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-semibold text-stone-700">Mật khẩu</div>
          <div className="border-primary text-foreground flex h-11 items-center justify-between rounded-lg border-2 bg-white px-3.5 text-base tracking-widest">
            {showPassword ? 'phominh2026' : '••••••••••'}
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-primary text-xs font-medium tracking-normal"
            >
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-stone-700">
            <span className="block h-4 w-4 rounded border-2 border-stone-400 bg-white" />
            <span>Ghi nhớ thiết bị 30 ngày</span>
          </div>
          <button type="button" className="text-primary text-sm font-normal">
            Quên mật khẩu
          </button>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="mt-1 flex h-12 items-center justify-center rounded-xl bg-stone-900 text-sm font-semibold text-white"
        >
          Tiếp tục
        </button>
        <div className="flex items-start gap-2.5 rounded-lg border border-stone-200 bg-white px-3.5 py-3">
          <span className="bg-admin-amber mt-1.5 h-1.5 w-1.5 flex-none rounded-full" />
          <span className="text-xs leading-relaxed text-stone-700">
            Còn 4 lần thử trước khi tài khoản bị khóa tạm 15 phút. Lần đăng nhập gần nhất:
            06/08/2026 07:12 — Chrome, TP.HCM.
          </span>
        </div>
      </div>
    </div>
  );
}

function TwofaStep({ onBack, onSignIn }: { onBack: () => void; onSignIn: () => void }) {
  const digits = ['4', '0', '7', '|', '', ''];

  return (
    <div>
      <div className="text-xl font-bold tracking-tight">Xác thực hai lớp</div>
      <div className="mt-1.5 text-sm leading-relaxed text-stone-600">
        Nhập mã 6 số từ ứng dụng authenticator của bạn.
      </div>

      <div className="mt-6 flex gap-2">
        {digits.map((d, i) => (
          <div
            key={i}
            className={
              'flex h-14 flex-1 items-center justify-center rounded-lg border bg-white text-xl font-semibold ' +
              (i === 3 ? 'border-primary border-2 text-stone-500' : 'border-border')
            }
          >
            {d}
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-xs text-stone-600">Mã còn hiệu lực 00:23</div>

      <button
        type="button"
        onClick={onSignIn}
        className="bg-primary text-primary-foreground mt-5 flex h-12 items-center justify-center rounded-xl text-sm font-semibold"
      >
        Vào bảng điều khiển
      </button>
      <button
        type="button"
        onClick={onBack}
        className="border-border mt-2.5 flex h-11 items-center justify-center rounded-xl border text-sm font-medium"
      >
        Quay lại
      </button>

      <div className="border-admin-green-soft-border bg-admin-green-soft mt-4 flex items-start gap-2.5 rounded-lg border px-3.5 py-3">
        <span className="bg-admin-green mt-1.5 h-1.5 w-1.5 flex-none rounded-full" />
        <span className="text-admin-green text-xs leading-relaxed">
          Mất thiết bị xác thực? Liên hệ quản trị hệ thống để cấp lại — không có cơ chế tự khôi phục
          qua SMS.
        </span>
      </div>
    </div>
  );
}
