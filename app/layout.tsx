import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'mindX · VEX GO Studio', description: 'Không gian lập trình VEX GO trên trình duyệt.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#123e35' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
