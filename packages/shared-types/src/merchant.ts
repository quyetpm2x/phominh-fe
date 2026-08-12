export interface MerchantProfile {
  id: string;
  userId: string;
  businessName: string;
  address: string;
  zaloPhoneNumber: string | null;
  visiblePhoneStart: string | null;
  visiblePhoneEnd: string | null;
  isVerified: boolean;
  freeMonthsRemaining: number;
}
