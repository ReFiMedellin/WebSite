import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReFi Medellín',
  description: 'Developed by Another_Dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
      <html lang='en'>
        <Providers>
          <body className={inter.className}>
            <Navbar />
            {children}
          </body>
        </Providers>
      </html>
  );
}
