'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import { UserActivityCard } from '@/components/user-activity-card';
import {
  useAdminUserDetail,
  type AdminUserDetail,
  type AdminUserTrustHistoryItem,
} from '@/hooks/useAdminUsers';

const SOURCE_LABEL: Record<string, string> = {
  vote: 'Được vote hữu ích',
  violation_confirmed: 'Vi phạm bị xác nhận',
  appeal_reversal: 'Khiếu nại được chấp nhận',
};

const SEVERITY_LABEL: Record<string, string> = {
  light: 'nhẹ',
  medium: 'trung bình',
  severe: 'nghiêm trọng',
};

// Chi tiết người dùng — C2 (tai-lieu-chuc-nang.md #92). Bắt buộc ghi lý do trước khi mở, ghi vào
// SensitiveDataAccessLog ở backend — không dựng lại phần "cụm vote"/"cùng thiết bị" trong mock gốc
// vì thuộc phát hiện thông đồng (mục 93/7e), đã hoãn có chủ ý. Suspense bọc quanh phần dùng
// useSearchParams() — bắt buộc với Next.js App Router khi build static export.
export default function UsersC2Page() {
  return (
    <Suspense fallback={<div className="text-sm text-stone-600">Đang tải…</div>}>
      <UsersC2Content />
    </Suspense>
  );
}

function UsersC2Content() {
  const userId = useSearchParams().get('id');
  const { detail, error, revealing, reveal } = useAdminUserDetail(userId);
  const [reason, setReason] = useState('');

  return (
    <UserDetailBody
      userId={userId}
      detail={detail}
      error={error}
      revealing={revealing}
      reason={reason}
      setReason={setReason}
      onReveal={() => void reveal(reason)}
    />
  );
}

function UserDetailBody({
  userId,
  detail,
  error,
  revealing,
  reason,
  setReason,
  onReveal,
}: {
  userId: string | null;
  detail: AdminUserDetail | null;
  error: string | null;
  revealing: boolean;
  reason: string;
  setReason: (v: string) => void;
  onReveal: () => void;
}) {
  if (!userId) {
    return (
      <div className="text-sm text-stone-600">
        Chọn 1 người dùng từ danh sách C1 để xem chi tiết.
      </div>
    );
  }
  if (detail) return <DetailView detail={detail} />;
  return (
    <RevealGate
      reason={reason}
      setReason={setReason}
      revealing={revealing}
      error={error}
      onReveal={onReveal}
    />
  );
}

function RevealGate({
  reason,
  setReason,
  revealing,
  error,
  onReveal,
}: {
  reason: string;
  setReason: (v: string) => void;
  revealing: boolean;
  error: string | null;
  onReveal: () => void;
}) {
  return (
    <div className="border-border bg-background max-w-md rounded-lg border p-5">
      <div className="text-sm font-semibold">Nhập lý do trước khi xem chi tiết</div>
      <p className="mt-1 text-xs leading-relaxed text-stone-600">
        Mọi lượt xem chi tiết đầy đủ 1 người dùng đều được ghi vào audit log (F3).
      </p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="VD: đang xử lý report #123"
        rows={3}
        className="border-border mt-3 w-full rounded-md border px-3 py-2 text-sm"
      />
      {error ? <div className="text-admin-red mt-2 text-xs">{error}</div> : null}
      <button
        type="button"
        disabled={reason.trim().length < 5 || revealing}
        onClick={onReveal}
        className="mt-3 rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-50"
      >
        {revealing ? 'Đang mở…' : 'Xem chi tiết'}
      </button>
    </div>
  );
}

function DetailView({ detail }: { detail: AdminUserDetail }) {
  return (
    <div className="flex items-start gap-4">
      <ProfileCard detail={detail} />
      <TrustHistoryCard history={detail.trustHistory} />
      <UserActivityCard userId={detail.id} />
    </div>
  );
}

function ProfileCard({ detail }: { detail: AdminUserDetail }) {
  const facts: { k: string; v: string }[] = [
    { k: 'SĐT', v: detail.phoneNumber },
    { k: 'Tên thật', v: detail.realName ?? '—' },
    { k: 'Điểm uy tín E1', v: String(detail.trustScoreE1) },
    { k: 'Ngày tham gia', v: new Date(detail.createdAt).toLocaleDateString('vi-VN') },
    { k: 'Bài đăng', v: String(detail.postCount) },
    { k: 'Bình luận', v: String(detail.commentCount) },
    { k: 'Report đã nhận', v: String(detail.reportsReceivedCount) },
    { k: 'Report đã gửi', v: String(detail.reportsSentCount) },
  ];
  if (detail.statusReason) facts.push({ k: 'Lý do trạng thái', v: detail.statusReason });

  return (
    <div className="border-border bg-background w-72 flex-none rounded-lg border p-5">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold">
          {detail.alias.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-semibold">{detail.alias}</div>
          <div className="text-xs text-stone-600">{detail.trustBadgeLabel}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {facts.map((f) => (
          <div key={f.k} className="flex justify-between border-b border-stone-100 pb-2 text-xs">
            <span className="text-stone-600">{f.k}</span>
            <span className="font-medium">{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustHistoryCard({ history }: { history: AdminUserTrustHistoryItem[] }) {
  return (
    <div className="border-border bg-background flex-1 overflow-hidden rounded-lg border">
      <div className="border-b border-stone-100 px-4 py-3 text-sm font-semibold">
        Lịch sử điểm uy tín
      </div>
      {history.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-stone-600">Chưa có lịch sử nào.</div>
      ) : (
        history.map((h) => (
          <div
            key={h.id}
            className="flex items-center gap-3.5 border-b border-stone-100 px-4 py-3.5 last:border-0"
          >
            <span className="w-24 flex-none font-mono text-xs text-stone-500">
              {new Date(h.createdAt).toLocaleDateString('vi-VN')}
            </span>
            <span className="flex-1 text-sm leading-relaxed">
              {SOURCE_LABEL[h.sourceType] ?? h.sourceType}
              {h.severity ? ` (${SEVERITY_LABEL[h.severity] ?? h.severity})` : ''}
            </span>
            <span
              className={`font-mono text-sm font-semibold ${h.delta >= 0 ? 'text-admin-green' : 'text-admin-red'}`}
            >
              {h.delta >= 0 ? '+' : ''}
              {Math.round(h.delta)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
