import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AuthProvider from '../components/AuthProvider';
import { ToastProvider } from '../components/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Enzi Coffee Shop - POS System',
  description: 'A modern Point-of-Sale system for coffee shops',
  keywords: ['coffee shop', 'POS', 'point of sale', 'barista', 'cafe'],
  authors: [{ name: 'Enzi Coffee Shop' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <AuthProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col">{children}</div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
