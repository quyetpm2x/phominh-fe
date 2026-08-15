'use server';

import { z } from 'zod';

import { postPublicLead } from '../../lib/backendApi';

const submitContactSchema = z.object({
  name: z.string().min(1, 'Nhập tên'),
  contact: z.string().min(1, 'Nhập email hoặc số điện thoại'),
  message: z.string().min(1, 'Nhập nội dung'),
});

export type SubmitContactInput = z.infer<typeof submitContactSchema>;

export interface SubmitContactResult {
  success: boolean;
  error?: string;
}

// Gọi thẳng NestJS backend POST /api/public/contact (PublicLeadsController).
export async function submitContact(input: SubmitContactInput): Promise<SubmitContactResult> {
  const parsed = submitContactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' };
  }

  const result = await postPublicLead('contact', parsed.data);
  return result.ok ? { success: true } : { success: false, error: result.error };
}
