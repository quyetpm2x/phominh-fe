'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { registerMerchant } from '../app/actions/register-merchant';
import { BRAND } from '../lib/constants';

const schema = z.object({
  businessName: z.string().min(1, 'Nhập tên quán'),
  phoneNumber: z
    .string()
    .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, 'Số điện thoại không đúng định dạng VN'),
  address: z.string().min(1, 'Nhập khu vực quán'),
});

type FormValues = z.infer<typeof schema>;

export function MerchantRegisterForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const result = await registerMerchant(values);
    if (result.success) {
      setSent(true);
    } else {
      setServerError(result.error ?? 'Có lỗi xảy ra, thử lại sau.');
    }
  }

  return (
    <div className="bg-background text-foreground rounded-[20px] p-7">
      <div className="text-xl font-bold">Thông tin quán</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Tên quán</span>
          <input
            {...register('businessName')}
            placeholder="Bún bò Anh Long"
            className="border-border h-[52px] rounded-[13px] border bg-white px-3.5 font-sans text-base"
          />
          {errors.businessName ? (
            <span className="text-destructive text-sm">{errors.businessName.message}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Số điện thoại (dùng cả cho Zalo)</span>
          <input
            {...register('phoneNumber')}
            placeholder="09xx xxx xxx"
            className="border-border h-[52px] rounded-[13px] border bg-white px-3.5 font-sans text-base"
          />
          {errors.phoneNumber ? (
            <span className="text-destructive text-sm">{errors.phoneNumber.message}</span>
          ) : null}
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Khu vực quán</span>
          <input
            {...register('address')}
            placeholder="Phường, quận — ví dụ: Vĩnh Tuy, Hai Bà Trưng"
            className="border-border h-[52px] rounded-[13px] border bg-white px-3.5 font-sans text-base"
          />
          {errors.address ? (
            <span className="text-destructive text-sm">{errors.address.message}</span>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="from-primary mt-1.5 h-14 w-full rounded-2xl bg-gradient-to-br to-[#1A4794] text-[16.5px] font-bold text-white shadow-[0_10px_24px_rgba(255,201,60,.28)] transition-transform hover:-translate-y-px disabled:opacity-60"
        >
          {isSubmitting ? 'Đang gửi…' : 'Gửi đăng ký'}
        </button>
        {serverError ? <div className="text-destructive text-sm">{serverError}</div> : null}
      </form>
      {sent ? (
        <div className="border-primary-soft-border bg-primary-soft-100 text-primary-darker mt-3.5 rounded-[13px] border p-3.5 text-[14.5px] leading-[1.55]">
          Đã nhận thông tin quán mình. Sẽ có người gọi lại trong một ngày làm việc.
        </div>
      ) : null}
      <div className="mt-3.5 text-[13px] leading-[1.6] text-gray-800 [text-wrap:pretty]">
        Chỉ ba trường này. Nếu đang gặp nhân viên {BRAND} tại quán, anh chị có thể để họ điền hộ.
      </div>
    </div>
  );
}
