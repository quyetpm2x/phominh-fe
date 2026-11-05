'use client';

import * as React from 'react';

import { Card, TextSetting } from './setting-fields';

const formatVnd = (amount: number) => `${amount.toLocaleString('vi-VN')}đ`;

// Quỹ thưởng Đua Top và % từng hạng: giải = quỹ × %. Áp dụng ngay cho bảng trong app và cho lần chốt thưởng kế tiếp; các
// tháng đã chốt giữ nguyên. Ảnh hưởng tiền thật nên server từ chối nếu tổng % khác 100.
export function RewardSettingsCard(props: {
  pool: number;
  percents: number[];
  save: (key: 'rewardMonthlyPool' | 'rewardRankPercents', value: unknown) => Promise<void>;
}) {
  const saved = props.percents.join(',');
  const [draft, setDraft] = React.useState(props.percents.map(String));
  React.useEffect(() => setDraft(saved.split(',')), [saved]);
  const numbers = draft.map(Number);
  const total = numbers.reduce((sum, value) => sum + value, 0);
  const valid = total === 100 && numbers.every((value) => Number.isInteger(value) && value >= 0);
  return (
    <Card title="Thưởng Đua Top">
      <TextSetting
        label="Tổng quỹ thưởng mỗi tháng (đồng)"
        hint="Giải từng hạng tự tính theo %. Ảnh hưởng tiền thật"
        value={String(props.pool)}
        onSave={(text) => void props.save('rewardMonthlyPool', Number(text))}
      />
      <div className="text-sm font-semibold">% quỹ của từng hạng</div>
      <div className="mb-2 text-xs text-stone-600">Số nguyên, tổng phải đúng 100%</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {draft.map((value, index) => (
          <label key={index} className="flex items-center gap-2 text-sm">
            <span className="w-14 text-stone-600">Hạng {index + 1}</span>
            <input
              value={value}
              inputMode="numeric"
              aria-label={`Phần trăm hạng ${index + 1}`}
              onChange={(event) =>
                setDraft(draft.map((item, i) => (i === index ? event.target.value : item)))
              }
              className="border-border w-14 rounded-md border px-2 py-1 text-sm"
            />
            <span className="text-xs text-stone-600">
              % · {formatVnd(Math.round((props.pool * (numbers[index] || 0)) / 100))}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={valid ? 'text-xs text-stone-600' : 'text-admin-red text-xs font-semibold'}>
          Tổng: {total}%{valid ? '' : ' (phải đúng 100%)'}
        </span>
        <button
          type="button"
          disabled={!valid || draft.join(',') === saved}
          onClick={() => void props.save('rewardRankPercents', numbers)}
          className="rounded-md bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          Lưu %
        </button>
      </div>
    </Card>
  );
}
