'use client';

import { useState, useTransition } from 'react';

import { notifySignup } from '../app/actions/notify-signup';

export function NotifySignup() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await notifySignup({ phoneNumber: phone });
      if (result.success) {
        setSent(true);
      } else {
        setError(result.error ?? 'Có lỗi xảy ra, thử lại sau.');
      }
    });
  }

  if (sent) {
    return (
      <div className="border-primary-soft-border bg-primary-soft-100 text-primary mt-3.5 rounded-xl border p-3.5 text-sm leading-[1.55]">
        Đã lưu số điện thoại. Mở khu mới sẽ có người nhắn bạn trước.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3.5">
      <div className="flex gap-2">
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          className="border-border bg-background h-12 flex-1 rounded-xl border px-3.5 font-sans text-[15px]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-ink rounded-xl px-5 font-sans text-[14.5px] font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Đang gửi…' : 'Nhận thông báo'}
        </button>
      </div>
      {error ? <div className="text-destructive mt-2 text-sm">{error}</div> : null}
    </form>
  );
}
