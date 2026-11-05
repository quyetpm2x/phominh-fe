'use client';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';

interface PhoneLikeUser {
  id: string;
  realName: string | null;
  nickname: string | null;
  phoneNumber: string;
  createdAt: string;
}

// Tài khoản có tên hoặc biệt danh chứa dãy số dài: nhiều khả năng đang hiện công khai số điện thoại trong app.
export default function UsersC9Page() {
  const { data, error } = useAdminResource<PhoneLikeUser[]>('/api/admin/users-phone-like-names');
  return (
    <>
      <AdminError message={error} />
      {data?.length === 0 ? (
        <p className="text-sm text-stone-600">Không có tài khoản nào.</p>
      ) : null}
      {data?.length ? (
        <div className="border-border bg-background overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-5 py-2">Tên</th>
                <th className="px-5 py-2">Biệt danh</th>
                <th className="px-5 py-2">SĐT đăng ký</th>
                <th className="px-5 py-2">Tạo lúc</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-5 py-2">{user.realName ?? '—'}</td>
                  <td className="px-5 py-2">{user.nickname ?? '—'}</td>
                  <td className="px-5 py-2">{user.phoneNumber}</td>
                  <td className="px-5 py-2">{new Date(user.createdAt).toLocaleString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
