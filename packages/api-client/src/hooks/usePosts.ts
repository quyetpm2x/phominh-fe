import { useQuery } from '@tanstack/react-query';
import type { Post } from '@pho-minh/shared-types';

import type { ApiClient } from '../client';

export function usePosts(client: ApiClient) {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => client.get('posts').json<Post[]>(),
  });
}
