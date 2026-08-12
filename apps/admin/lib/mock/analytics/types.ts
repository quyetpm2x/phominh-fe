// Ported từ GTABS trong Admin.dc.html — dùng cho G1-G8. Chưa có backend cho các chỉ số phân
// tích này (api-sync: không có endpoint được generate), giữ nguyên fidelity của mock.
export type ChartTone = 'ok' | 'warn' | 'bad' | 'neu';

interface BlockBase {
  title: string;
  desc?: string;
  action?: string;
  foot?: string;
  wide?: boolean;
}

export interface DataPoint {
  l: string;
  v: number;
  fmt?: string;
  tone?: ChartTone;
}

export interface HeroBlock extends BlockBase {
  kind: 'hero';
  value: string;
  arrow: string;
  note: string;
  data: DataPoint[];
}

export interface BarsBlock extends BlockBase {
  kind: 'bars';
  data: DataPoint[];
}

export interface HBarsBlock extends BlockBase {
  kind: 'hbars';
  data: DataPoint[];
}

export interface GridCell {
  v: string;
  p: number;
}

export interface GridBlock extends BlockBase {
  kind: 'grid';
  cols: string[];
  rows: { l: string; cells: GridCell[] }[];
}

export interface ListBlock extends BlockBase {
  kind: 'list';
  items: { text: string; status: string; tone: ChartTone }[];
}

export interface LineBlock extends BlockBase {
  kind: 'line';
  data: DataPoint[];
  max?: number;
  min?: number;
  thresh?: number;
  threshLabel?: string;
  fmt?: (v: number) => string;
}

export interface HeatBlock extends BlockBase {
  kind: 'heat';
  cols: string[];
  rows: { l: string; cells: GridCell[] }[];
  legend?: string;
}

export interface DonutBlock extends BlockBase {
  kind: 'donut';
  segs: { l: string; v: string; pct: number; tone?: ChartTone }[];
  center: string;
  centerNote: string;
}

export interface FunnelBlock extends BlockBase {
  kind: 'funnel';
  steps: { l: string; v: number; tone?: ChartTone }[];
}

export interface GaugeBlock extends BlockBase {
  kind: 'gauge';
  pct: number;
  tone?: ChartTone;
  value: string;
  sub: string;
  target: string;
}

export interface TableCell {
  v: string;
  bold?: boolean;
  tone?: ChartTone;
  right?: boolean;
}

export interface TableBlock extends BlockBase {
  kind: 'table';
  cols: string[];
  rows: (string | TableCell)[][];
}

export type AnalyticsBlock =
  | HeroBlock
  | BarsBlock
  | HBarsBlock
  | GridBlock
  | ListBlock
  | LineBlock
  | HeatBlock
  | DonutBlock
  | FunnelBlock
  | GaugeBlock
  | TableBlock;

export interface GTab {
  id: string;
  tab: string;
  name: string;
  desc: string;
  blocks: AnalyticsBlock[];
}
