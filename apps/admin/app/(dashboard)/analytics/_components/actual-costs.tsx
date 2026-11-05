'use client';

import * as React from 'react';

import { AdminError } from '@/components/admin-error';
import { useAdminErrorText } from '@/hooks/useAdminResource';
import { adminFetch } from '@/lib/adminApi';

export interface ActualCostRow {
  month: string;
  sms: number;
  storage: number;
  maps: number;
  total: number;
  activeUsers: number;
  costPerActiveUser: number | null;
}

const FIELDS = [
  { key: 'sms', label: 'SMS OTP' },
  { key: 'storage', label: 'Lưu trữ ảnh' },
  { key: 'maps', label: 'Bản đồ Goong' },
] as const;

const vnd = (value: number) => `${value.toLocaleString('vi-VN')}đ`;
const costMap = (rows: readonly ActualCostRow[]) =>
  Object.fromEntries(rows.map(({ month, sms, storage, maps }) => [month, { sms, storage, maps }]));

// Chi phí thực admin nhập từ hoá đơn hằng tháng, khác phần ước lượng phía trên. Nhập lại cùng tháng thì ghi đè.
export function ActualCosts({ rows, onSaved }: { rows: ActualCostRow[]; onSaved: () => void }) {
  const errorText = useAdminErrorText();
  const [month, setMonth] = React.useState(() => new Date().toISOString().slice(0, 7));
  const [values, setValues] = React.useState({ sms: '', storage: '', maps: '' });
  const [error, setError] = React.useState<string | null>(null);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const entry = {
      sms: Number(values.sms),
      storage: Number(values.storage),
      maps: Number(values.maps),
    };
    try {
      await adminFetch('/api/admin/config/monthlyActualCosts', {
        method: 'PUT',
        body: JSON.stringify({ value: { ...costMap(rows), [month]: entry } }),
      });
      setValues({ sms: '', storage: '', maps: '' });
      onSaved();
    } catch (err) {
      setError(errorText(err));
    }
  };
  return (
    <section className="border-border bg-background mt-3.5 rounded-lg border p-5">
      <h2 className="mb-3 text-sm font-semibold">Chi phí thực theo hoá đơn</h2>
      <AdminError message={error} />
      <CostForm
        month={month}
        setMonth={setMonth}
        values={values}
        setValues={setValues}
        onSubmit={(event) => void save(event)}
      />
      {rows.length === 0 ? (
        <p className="text-sm text-stone-600">Chưa nhập tháng nào.</p>
      ) : (
        <CostTable rows={rows} />
      )}
    </section>
  );
}

type CostValues = { sms: string; storage: string; maps: string };

function CostForm(props: {
  month: string;
  setMonth: (month: string) => void;
  values: CostValues;
  setValues: React.Dispatch<React.SetStateAction<CostValues>>;
  onSubmit: (event: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={props.onSubmit} className="mb-4 flex flex-wrap items-end gap-2">
      <label className="text-xs font-semibold">
        Tháng
        <input
          type="month"
          required
          value={props.month}
          onChange={(event) => props.setMonth(event.target.value)}
          className="border-border mt-1 block rounded-md border px-2 py-1.5 text-sm font-normal"
        />
      </label>
      {FIELDS.map(({ key, label }) => (
        <label key={key} className="text-xs font-semibold">
          {label} (đồng)
          <input
            type="number"
            min={0}
            step={1}
            required
            value={props.values[key]}
            onChange={(event) =>
              props.setValues((current) => ({ ...current, [key]: event.target.value }))
            }
            className="border-border mt-1 block w-32 rounded-md border px-2 py-1.5 text-sm font-normal"
          />
        </label>
      ))}
      <button
        type="submit"
        className="rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white"
      >
        Lưu
      </button>
    </form>
  );
}

function CostTable({ rows }: { rows: ActualCostRow[] }) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-500">
        <tr>
          <th className="py-2">Tháng</th>
          <th>SMS</th>
          <th>Lưu trữ</th>
          <th>Bản đồ</th>
          <th>Tổng</th>
          <th>Người hoạt động</th>
          <th>Chi phí / người</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.month} className="border-b border-stone-100 last:border-0">
            <td className="py-2 font-mono text-xs">{row.month}</td>
            <td>{vnd(row.sms)}</td>
            <td>{vnd(row.storage)}</td>
            <td>{vnd(row.maps)}</td>
            <td className="font-semibold">{vnd(row.total)}</td>
            <td>{row.activeUsers.toLocaleString('vi-VN')}</td>
            <td>{row.costPerActiveUser === null ? '—' : vnd(row.costPerActiveUser)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
