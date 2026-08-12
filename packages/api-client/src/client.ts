import ky from 'ky';

// Nơi lưu token khác nhau giữa Admin (httpOnly cookie, không đọc được từ JS) và các ngữ
// cảnh khác — implementer app truyền getAccessToken/refreshAccessToken phù hợp lúc khởi tạo.
export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => string | null;
  refreshAccessToken?: () => Promise<string | null>;
  onAuthExpired?: () => void | Promise<void>;
}

export function createApiClient(config: ApiClientConfig) {
  let refreshPromise: Promise<string | null> | null = null;

  async function refresh(): Promise<string | null> {
    if (!config.refreshAccessToken) return null;
    if (refreshPromise) return refreshPromise; // request thứ 2, 3 chờ chung, không refresh riêng lẻ
    refreshPromise = config
      .refreshAccessToken()
      .finally(() => {
        refreshPromise = null;
      });
    return refreshPromise;
  }

  return ky.create({
    prefixUrl: config.baseUrl,
    hooks: {
      beforeRequest: [
        (request) => {
          const token = config.getAccessToken?.();
          if (token) request.headers.set('Authorization', `Bearer ${token}`);
        },
      ],
      afterResponse: [
        async (request, _options, response) => {
          if (response.status === 401) {
            const newToken = await refresh();
            if (newToken) {
              request.headers.set('Authorization', `Bearer ${newToken}`);
              return ky(request);
            }
            await config.onAuthExpired?.();
          }
          return response;
        },
      ],
    },
  });
}

export type ApiClient = ReturnType<typeof createApiClient>;
