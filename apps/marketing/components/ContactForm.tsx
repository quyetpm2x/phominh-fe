'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { submitContact } from '../app/actions/submit-contact';

const schema = z.object({
  name: z.string().min(1, 'Nhập tên'),
  contact: z.string().min(1, 'Nhập email hoặc số điện thoại'),
  message: z.string().min(1, 'Nhập nội dung'),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const result = await submitContact(values);
    if (result.success) {
      setSent(true);
    } else {
      setServerError(result.error ?? 'Có lỗi xảy ra, thử lại sau.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-3.5">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Tên</span>
        <input
          {...register('name')}
          placeholder="Tên anh chị"
          className="border-border bg-background h-[50px] rounded-xl border px-3.5 font-sans text-[15.5px]"
        />
        {errors.name ? (
          <span className="text-destructive text-sm">{errors.name.message}</span>
        ) : null}
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Email hoặc số điện thoại</span>
        <input
          {...register('contact')}
          placeholder="Chỗ nào tiện thì để chỗ đó"
          className="border-border bg-background h-[50px] rounded-xl border px-3.5 font-sans text-[15.5px]"
        />
        {errors.contact ? (
          <span className="text-destructive text-sm">{errors.contact.message}</span>
        ) : null}
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold">Nội dung</span>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Anh chị cần hỏi gì?"
          className="border-border bg-background resize-y rounded-xl border px-3.5 py-3 font-sans text-[15.5px]"
        />
        {errors.message ? (
          <span className="text-destructive text-sm">{errors.message.message}</span>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-ink mt-1.5 h-[54px] w-full rounded-[13px] text-base font-semibold text-white disabled:opacity-60"
      >
        {isSubmitting ? 'Đang gửi…' : 'Gửi'}
      </button>
      {serverError ? <div className="text-destructive text-sm">{serverError}</div> : null}
      {sent ? (
        <div className="border-primary-soft-border bg-primary-soft-100 text-primary-darker rounded-xl border p-3.5 text-[14.5px] leading-[1.55]">
          Đã nhận. Chúng tôi sẽ trả lời sớm.
        </div>
      ) : null}
    </form>
  );
}
