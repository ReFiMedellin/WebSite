import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReFi Medellín',
  description: 'Somos el primer Nodo Colombiano de ReFiDAO encargado de promover proyectos ReFi en la región. \nEn ReFi Medellín, creemos en los proyectos regenerativos y el impacto transformador que estos tienen. ¡Es hora de pensar diferente y regenerarnos juntos!',
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
