'use server';

import { z } from 'zod';

import { postPublicLead } from '../../lib/backendApi';

const notifySignupSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, 'Số điện thoại không đúng định dạng VN'),
});

export type NotifySignupInput = z.infer<typeof notifySignupSchema>;

export interface NotifySignupResult {
  success: boolean;
  error?: string;
}

// Gọi thẳng NestJS backend POST /api/public/pilot-signups (PublicLeadsController).
export async function notifySignup(input: NotifySignupInput): Promise<NotifySignupResult> {
  const parsed = notifySignupSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' };
  }

  const result = await postPublicLead('pilot-signups', parsed.data);
  return result.ok ? { success: true } : { success: false, error: result.error };
}
