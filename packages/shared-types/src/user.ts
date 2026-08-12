export interface User {
  id: string;
  phoneNumber: string;
  displayName: string | null;
  trustScore: number;
  createdAt: string;
  isBanned: boolean;
}
