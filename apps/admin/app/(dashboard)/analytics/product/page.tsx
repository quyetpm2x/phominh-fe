'use client';

import { AdminError } from '@/components/admin-error';
import { useAdminResource } from '@/hooks/useAdminResource';

interface ProductMetrics {
  windowDays: number;
  activeUsers: { dau: number; wau: number; mau: number; stickinessPercent: number };
  trust: {
    votes: number;
    revoked: number;
    revokeRatePercent: number;
    levels: { level: number; label: string; users: number }[];
    topGainers7d: { userId: string; name: string | null; votes: number }[];
  };
  rewards: { paid: number; awaiting: number; failed: number };
  social: {
    acquaintancesPerUser: number;
    conversations: number;
    messages: number;
    requestAcceptPercent: number;
    avgHoursToAccept: number | null;
    conversationsAtLimit: number;
  };
  content: {
    posts: number;
    comments: number;
    anonymousPostPercent: number;
    anonymousCommentPercent: number;
    mentions: number;
  };
}

const num = (value: number) => value.toLocaleString('vi-VN');
const money = (value: number) => `${num(value)}đ`;

// Chỉ số sản phẩm: số thật tính tại lúc mở trang, chưa lọc theo khu.
export default function AnalyticsProductPage() {
  const { data, error } = useAdminResource<ProductMetrics>('/api/admin/analytics/product-metrics');
  if (error) return <AdminError message={error} />;
  if (!data) return <div className="px-1 py-4 text-sm text-stone-600">Đang tải…</div>;
  const { activeUsers, trust, rewards, social, content } = data;
  return (
    <>
      <Section title="Người dùng hoạt động">
        <Stat label="Hôm nay (DAU)" value={num(activeUsers.dau)} />
        <Stat label="7 ngày (WAU)" value={num(activeUsers.wau)} />
        <Stat label="30 ngày (MAU)" value={num(activeUsers.mau)} />
        <Stat label="DAU / MAU" value={`${activeUsers.stickinessPercent}%`} />
      </Section>
      <Section title={`Uy tín (${data.windowDays} ngày)`}>
        <Stat label="Phiếu tin tưởng mới" value={num(trust.votes)} />
        <Stat label="Phiếu bị rút" value={num(trust.revoked)} />
        <Stat label="Tỉ lệ rút" value={`${trust.revokeRatePercent}%`} />
      </Section>
      <Section title="Tiền thưởng">
        <Stat label="Đã chi" value={money(rewards.paid)} />
        <Stat label="Đang chờ duyệt" value={money(rewards.awaiting)} />
        <Stat label="Chi lỗi" value={money(rewards.failed)} />
      </Section>
      <Section title={`Người quen và tin nhắn (${data.windowDays} ngày)`}>
        <Stat label="Người quen / người dùng" value={String(social.acquaintancesPerUser)} />
        <Stat label="Hội thoại mới" value={num(social.conversations)} />
        <Stat label="Tin nhắn" value={num(social.messages)} />
        <Stat label="Lời mời được chấp nhận" value={`${social.requestAcceptPercent}%`} />
        <Stat
          label="Thời gian tới lúc chấp nhận"
          value={social.avgHoursToAccept === null ? '—' : `${social.avgHoursToAccept} giờ`}
        />
        <Stat label="Hội thoại chạm giới hạn 3 tin" value={num(social.conversationsAtLimit)} />
      </Section>
      <Section title={`Nội dung (${data.windowDays} ngày)`}>
        <Stat label="Bài đăng" value={num(content.posts)} />
        <Stat label="Bình luận" value={num(content.comments)} />
        <Stat label="Bài ẩn danh" value={`${content.anonymousPostPercent}%`} />
        <Stat label="Bình luận ẩn danh" value={`${content.anonymousCommentPercent}%`} />
        <Stat label="Lượt tag" value={num(content.mentions)} />
      </Section>
      <TrustBreakdown trust={trust} />
    </>
  );
}

function TrustBreakdown({ trust }: { trust: ProductMetrics['trust'] }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
      <div className="border-border bg-background rounded-lg border p-5">
        <h2 className="mb-3 text-sm font-semibold">Người dùng theo cấp huy hiệu</h2>
        {trust.levels.map((level) => (
          <div key={level.level} className="flex justify-between py-1 text-sm">
            <span>{level.label}</span>
            <span className="font-mono">{num(level.users)}</span>
          </div>
        ))}
      </div>
      <div className="border-border bg-background rounded-lg border p-5">
        <h2 className="mb-3 text-sm font-semibold">Tăng uy tín nhanh nhất 7 ngày</h2>
        {trust.topGainers7d.length === 0 ? (
          <p className="text-sm text-stone-600">Chưa có dữ liệu.</p>
        ) : null}
        {trust.topGainers7d.map((user) => (
          <div key={user.userId} className="flex justify-between py-1 text-sm">
            <span>{user.name ?? 'Chưa có tên'}</span>
            <span className="font-mono">+{num(user.votes)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-sm font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-4">{children}</div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="text-xs font-semibold text-stone-600">{label}</div>
      <div className="mt-2 font-mono text-2xl font-semibold text-stone-900">{value}</div>
    </div>
  );
}
