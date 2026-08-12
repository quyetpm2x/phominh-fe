'use server';

import { z } from 'zod';

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

// Gọi thẳng NestJS backend /api/public/contact khi endpoint sẵn sàng (mục 1, 3 tài liệu FE).
export async function submitContact(input: SubmitContactInput): Promise<SubmitContactResult> {
  const parsed = submitContactSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' };
  }

  // TODO: gọi backend NestJS thật khi endpoint /api/public/contact sẵn sàng.
  return { success: true };
}
