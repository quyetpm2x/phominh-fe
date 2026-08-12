// Thang khoảng cách theo tỷ lệ vàng (~1.618), làm tròn tới số chẵn gần nhất.
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '14px',
  lg: '22px',
  xl: '36px',
  '2xl': '58px',
  '3xl': '94px',
} as const;

export const radius = {
  sm: '9px',
  md: '14px',
  lg: '20px',
  xl: '42px',
  full: '999px',
} as const;

export type Spacing = typeof spacing;
export type Radius = typeof radius;
