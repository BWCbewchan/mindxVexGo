import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

// One typeface for every Next page: designed for Vietnamese, self-hosted by next/font.
// Only the weights the CSS relies on; 500 renders as 400 and 800 as 700.
const appFont = Be_Vietnam_Pro({ subsets: ['latin', 'vietnamese'], weight: ['400', '600', '700'], display: 'swap', variable: '--font-app' });

export const metadata: Metadata = { title: 'mindX Robotics Lab · Lắp ráp, lập trình và mô phỏng', description: 'Lắp mô hình VEX GO và VEX IQ, lập trình robot trên sân ảo, xuất hướng dẫn lắp ráp và chia sẻ thiết kế cùng cộng đồng mindX.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#123e35' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" className={appFont.variable}><body>{children}</body></html>;
}
