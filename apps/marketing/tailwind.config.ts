import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [require('@pho-minh/ui/tailwind-preset')],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // next/font/google nạp font qua CSS variable — ghi đè font-sans/font-mono tĩnh
      // của packages/ui/tailwind-preset.js (Admin chưa dùng next/font nên giữ nguyên bên đó).
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      // Chuyển thẳng từ Homepage.dc.html — animation trang trí riêng của Marketing,
      // không thuộc bộ design-tokens dùng chung (không phải màu/spacing thương hiệu).
      keyframes: {
        pmpulse: { '0%,100%': { opacity: '.35' }, '50%': { opacity: '1' } },
        pmup: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pmfloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        pmring: {
          '0%': { transform: 'translate(-50%,-50%) scale(.72)', opacity: '.55' },
          '100%': { transform: 'translate(-50%,-50%) scale(1.5)', opacity: '0' },
        },
        pmsweep: {
          '0%': { transform: 'translateX(-120%)' },
          '60%,100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        pmpulse: 'pmpulse 2.4s infinite',
        pmup: 'pmup .7s ease both',
        pmfloat: 'pmfloat 9s ease-in-out infinite',
        pmring: 'pmring 3.6s ease-out infinite',
        pmsweep: 'pmsweep 4.5s ease-in-out infinite',
      },
    },
  },
};

export default config;
