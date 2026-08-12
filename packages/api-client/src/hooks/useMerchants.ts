import { useQuery } from '@tanstack/react-query';
import type { MerchantProfile } from '@pho-minh/shared-types';

import type { ApiClient } from '../client';

export function useMerchants(client: ApiClient) {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: () => client.get('merchants').json<MerchantProfile[]>(),
  });
}
