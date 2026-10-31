// Placeholder — sẽ thay bằng type sinh từ openapi-typescript (packages/api-client/src/generated)
// khi backend NestJS công bố OpenAPI schema thật.
export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
  expiresAt: string;
  voteCount: number;
  commentCount: number;
}
