import * as React from 'react';

import { type AdminInfo, getMe } from '@/lib/adminApi';

// Hồ sơ admin đang đăng nhập, dùng cho avatar/tên ở topbar — JWT không chứa name nên phải gọi
// GET /api/admin/me thay vì đọc thẳng từ token.
export function useCurrentAdmin() {
  const [admin, setAdmin] = React.useState<AdminInfo | null>(null);

  React.useEffect(() => {
    void getMe()
      .then(setAdmin)
      .catch(() => setAdmin(null));
  }, []);

  return admin;
}
