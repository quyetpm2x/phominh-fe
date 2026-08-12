// Nguồn: bảng màu thương hiệu trong Homepage.dc.html (claude.ai/design).
// Đổi màu thương hiệu ở đây; Mobile giữ bản copy tay tại app/src/constants/design-tokens.ts.
export const colors = {
  primary: {
    DEFAULT: '#2D6CDF',
    dark: '#1A4794',
    darker: '#2158B8',
  },
  accent: {
    DEFAULT: '#FFC93C',
    dark: '#D9A511',
    text: '#8A6410',
    textHover: '#6E3018',
  },
  success: {
    DEFAULT: '#4CAF6D',
  },
  ink: {
    DEFAULT: '#20242B',
    soft: '#2C323C',
  },
  gray: {
    50: '#FAFBFC',
    100: '#EDEFF2',
    150: '#EBEEF1',
    200: '#E9ECEF',
    250: '#E4E8EC',
    300: '#E3E7EB',
    350: '#DEE3E8',
    400: '#D6DCE2',
    450: '#CBD2D9',
    500: '#B9C1CA',
    600: '#9AA5B1',
    700: '#B4BDC7',
    800: '#55606B',
    900: '#39424B',
  },
  accentSoft: {
    100: '#FFF4D3',
    200: '#FFEDBE',
    border: '#F5DC93',
    borderStrong: '#E9C351',
  },
  primarySoft: {
    100: '#E4ECFA',
    200: '#E9F0FC',
    border: '#B9CFF2',
  },
  background: '#FAFBFC',
  // Chưa có màu semantic "warning" (chỉ có success/destructive) — mặc định theo accent.dark
  // cho marketing; apps/admin ghi đè qua --color-warning trong globals.css (xem adminGreen/
  // adminAmber/adminRed bên dưới, nguồn Admin.dc.html).
  warning: {
    DEFAULT: '#D9A511',
  },
  // Nguồn: bảng màu Admin Console trong Admin.dc.html (claude.ai/design) — dùng riêng cho
  // apps/admin, tách khỏi bảng màu thương hiệu marketing ở trên. Thang xám ấm (stone) khác
  // thang "gray" lạnh phía trên — không dùng chung vì hai nguồn thiết kế khác nhau.
  stone: {
    25: '#FAF9F6',
    50: '#F6F4EF',
    75: '#F4F2EC',
    100: '#EFECE5',
    150: '#EEECE7',
    200: '#E6E2DA',
    300: '#E0DCD3',
    400: '#C9C3B8',
    500: '#A19C91',
    600: '#8B867C',
    700: '#5D5950',
    900: '#17150F',
  },
  adminGreen: {
    DEFAULT: '#1F6F52',
    soft: '#E4F0E9',
    softBorder: '#CFE3D8',
  },
  adminAmber: {
    DEFAULT: '#C9902A',
    soft: '#FBF0DC',
    softBorder: '#ECD9AE',
    text: '#7A5C14',
  },
  adminRed: {
    DEFAULT: '#C2492F',
    soft: '#FBE9E4',
    softBorder: '#F0C9BD',
    text: '#7D2C18',
  },
} as const;

export type Colors = typeof colors;
