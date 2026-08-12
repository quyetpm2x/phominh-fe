/** Preset dùng chung — apps/marketing và apps/admin extend qua `presets: [require('@pho-minh/ui/tailwind-preset')]` */
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
          // dark/darker — copy tay từ design-tokens colors.ts (xem ghi chú thang xám bên dưới).
          dark: '#1A4794',
          darker: '#2158B8',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
          dark: '#D9A511',
          text: '#8A6410',
        },
        // Không có biến CSS riêng cho ink — đây là màu chữ/nền tối thiết kế, tách biệt
        // khỏi "foreground" (vốn dùng cho theming ngữ nghĩa, có thể đổi ở dark mode sau này).
        ink: {
          DEFAULT: '#20242B',
          soft: '#2C323C',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        // Thang xám + soft-tint đầy đủ — copy tay từ packages/design-tokens/src/colors.ts.
        // Tailwind không require() được file .ts trực tiếp trong ngữ cảnh đọc config này,
        // nên giữ bản sao ở đây; đổi màu thương hiệu thì sửa CẢ HAI nơi (cùng tinh thần
        // "copy tay" đã áp dụng cho Mobile — xem FE tech doc mục 1).
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
        'accent-soft': {
          100: '#FFF4D3',
          200: '#FFEDBE',
          border: '#F5DC93',
          'border-strong': '#E9C351',
        },
        'primary-soft': {
          100: '#E4ECFA',
          200: '#E9F0FC',
          border: '#B9CFF2',
        },
        // Thang xám ấm + màu trạng thái riêng cho apps/admin — copy tay từ
        // packages/design-tokens/src/colors.ts (stone/adminGreen/adminAmber/adminRed),
        // nguồn Admin.dc.html. Cùng lý do "copy tay" như thang gray ở trên.
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
        'admin-green': {
          DEFAULT: '#1F6F52',
          soft: '#E4F0E9',
          'soft-border': '#CFE3D8',
        },
        'admin-amber': {
          DEFAULT: '#C9902A',
          soft: '#FBF0DC',
          'soft-border': '#ECD9AE',
          text: '#7A5C14',
        },
        'admin-red': {
          DEFAULT: '#C2492F',
          soft: '#FBE9E4',
          'soft-border': '#F0C9BD',
          text: '#7D2C18',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      fontFamily: {
        sans: ["'Be Vietnam Pro'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};
