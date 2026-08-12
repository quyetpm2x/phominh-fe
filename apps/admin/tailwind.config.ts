import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [require('@pho-minh/ui/tailwind-preset')],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

export default config;
