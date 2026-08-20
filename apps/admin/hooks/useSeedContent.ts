import { useRouter } from 'next/navigation';
import * as React from 'react';

import { AdminApiError, adminFetch } from '@/lib/adminApi';

export interface SeedPostItem {
  id: string;
  content: string;
  postType: 'life' | 'merchant' | 'emergency';
  lat: number;
  lng: number;
  createdAt: string;
}

export interface CreateSeedPostInput {
  pilotAreaId: string;
  content: string;
  postType: 'life' | 'merchant' | 'emergency';
}

// Đăng bài mồi thủ công (tai-lieu-chuc-nang.md #100) — trước đây permission `seed_content` chỉ
// khai báo, FE chỉ là SpecPlaceholder.
export function useSeedContent() {
  const router = useRouter();
  const [posts, setPosts] = React.useState<SeedPostItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [creating, setCreating] = React.useState(false);

  const load = React.useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<SeedPostItem[]>('/api/admin/seed-content');
      setPosts(data);
    } catch (err) {
      if (err instanceof AdminApiError && err.message.includes('hết hạn')) {
        router.push('/login');
        return;
      }
      setError(err instanceof AdminApiError ? err.message : 'Không kết nối được máy chủ');
    }
  }, [router]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function createSeedPost(input: CreateSeedPostInput): Promise<boolean> {
    setCreating(true);
    setError(null);
    try {
      await adminFetch('/api/admin/seed-content', { method: 'POST', body: JSON.stringify(input) });
      await load();
      return true;
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Không đăng được bài mồi');
      return false;
    } finally {
      setCreating(false);
    }
  }

  return { posts, error, creating, createSeedPost };
}
