import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'mindX Robotics Lab · Lắp ráp, lập trình và mô phỏng', description: 'Lắp mô hình VEX GO và VEX IQ, lập trình robot trên sân ảo, xuất hướng dẫn lắp ráp và chia sẻ thiết kế cùng cộng đồng mindX.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#123e35' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
