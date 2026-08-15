'use server';

import { z } from 'zod';

import { postPublicLead } from '../../lib/backendApi';

// Validate lại phía server dù React Hook Form + Zod đã validate ở client (mục 3 tài liệu FE).
const registerMerchantSchema = z.object({
  businessName: z.string().min(1),
  phoneNumber: z
    .string()
    .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, 'Số điện thoại không đúng định dạng VN'),
  address: z.string().min(1),
});

export type RegisterMerchantInput = z.infer<typeof registerMerchantSchema>;

export interface RegisterMerchantResult {
  success: boolean;
  error?: string;
}

// Gọi thẳng NestJS backend POST /api/public/merchants (PublicLeadsController, tai-lieu-chuc-nang.md
// #77) — chỉ tạo lead để đội vận hành gọi lại, KHÔNG tạo tài khoản/hồ sơ quán thật.
export async function registerMerchant(
  input: RegisterMerchantInput,
): Promise<RegisterMerchantResult> {
  const parsed = registerMerchantSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' };
  }

  const result = await postPublicLead('merchants', parsed.data);
  return result.ok ? { success: true } : { success: false, error: result.error };
}
