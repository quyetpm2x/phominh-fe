import { useQuery } from '@tanstack/react-query';
import type { Report } from '@pho-minh/shared-types';

import type { ApiClient } from '../client';

export function useReports(client: ApiClient) {
  return useQuery({
    queryKey: ['reports'],
    queryFn: () => client.get('reports').json<Report[]>(),
  });
}
