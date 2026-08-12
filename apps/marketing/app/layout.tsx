import type { Metadata } from 'next';
// eslint-disable-next-line camelcase -- next/font/google exports are named after the font (Google's naming, not ours)
import { Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google';

import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';

import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Phố Mình',
    template: '%s · Phố Mình',
  },
  description: 'Mạng xã hội của khu mình đang ở — mở app là biết ngay chuyện quanh mình.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <div className="max-w-full overflow-x-clip">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
