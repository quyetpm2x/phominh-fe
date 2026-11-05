'use client';

import * as React from 'react';

import { RewardSettingsCard } from './reward-settings-card';
import { Card, TextSetting } from './setting-fields';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText, useAdminResource } from '@/hooks/useAdminResource';
import { adminFetch } from '@/lib/adminApi';

interface AppConfig {
  messageRequestLimit: number;
  maxAcquaintances: number;
  rewardActivationUsers: number;
  rewardMonthlyPool: number;
  rewardRankPercents: number[];
  minAppVersion: string;
  postsDisabled: boolean;
  commentsDisabled: boolean;
  messagesDisabled: boolean;
  hiddenTopics: string[];
}

type ConfigKey = keyof AppConfig;

const SWITCHES: { key: ConfigKey; label: string }[] = [
  { key: 'postsDisabled', label: 'Tạm dừng đăng bài' },
  { key: 'commentsDisabled', label: 'Tạm dừng bình luận' },
  { key: 'messagesDisabled', label: 'Tạm dừng nhắn tin' },
];

const NUMBERS: { key: ConfigKey; label: string; hint: string }[] = [
  { key: 'messageRequestLimit', label: 'Số tin khi chưa được chấp nhận', hint: '1–50' },
  { key: 'maxAcquaintances', label: 'Số người quen tối đa', hint: '1–5.000' },
  {
    key: 'rewardActivationUsers',
    label: 'Người dùng hoạt động để bắt đầu trả thưởng',
    hint: 'Có hiệu lực từ lần chốt thưởng sau',
  },
];

// Cấu hình đổi ngay không cần phát hành bản mới. Mỗi lần lưu ghi nhật ký cả giá trị cũ và mới (A4); server tự kiểm tra hợp lệ.
export default function SystemConfigPage() {
  const errorText = useAdminErrorText();
  const { data, error, reload } = useAdminResource<AppConfig>('/api/admin/config');
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const save = async (key: ConfigKey, value: unknown) => {
    setSaveError(null);
    try {
      await adminFetch(`/api/admin/config/${key}`, {
        method: 'PUT',
        body: JSON.stringify({ value }),
      });
      await reload();
    } catch (err) {
      setSaveError(errorText(err));
    }
  };
  if (error) return <AdminError message={error} />;
  if (!data) return <div className="text-sm text-stone-600">Đang tải…</div>;
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <AdminError message={saveError} />
      <SwitchesCard data={data} save={save} />
      <NumbersCard data={data} save={save} />
      <RewardSettingsCard
        pool={data.rewardMonthlyPool}
        percents={data.rewardRankPercents}
        save={save}
      />
      <AppCard data={data} save={save} />
    </div>
  );
}

type CardProps = { data: AppConfig; save: (key: ConfigKey, value: unknown) => Promise<void> };

function SwitchesCard({ data, save }: CardProps) {
  return (
    <Card title="Tắt nhanh khi có sự cố">
      {SWITCHES.map(({ key, label }) => (
        <label key={key} className="flex items-center justify-between py-2 text-sm">
          {label}
          <input
            type="checkbox"
            checked={data[key] as boolean}
            onChange={(event) => void save(key, event.target.checked)}
          />
        </label>
      ))}
    </Card>
  );
}

function NumbersCard({ data, save }: CardProps) {
  return (
    <Card title="Giới hạn">
      {NUMBERS.map(({ key, label, hint }) => (
        <TextSetting
          key={key}
          label={label}
          hint={hint}
          value={String(data[key])}
          onSave={(text) => void save(key, Number(text))}
        />
      ))}
    </Card>
  );
}

function AppCard({ data, save }: CardProps) {
  return (
    <Card title="Ứng dụng">
      <TextSetting
        label="Bản app tối thiểu"
        hint="Dạng 1.2.3. Bản thấp hơn sẽ bị yêu cầu cập nhật"
        value={data.minAppVersion}
        onSave={(text) => void save('minAppVersion', text)}
      />
      <TextSetting
        label="Mã chủ đề bị ẩn"
        hint="Cách nhau bằng dấu phẩy. Không chọn được khi đăng bài mới, bài cũ giữ nguyên"
        value={data.hiddenTopics.join(', ')}
        onSave={(text) =>
          void save(
            'hiddenTopics',
            text
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
      />
    </Card>
  );
}
