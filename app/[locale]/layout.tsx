import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'
import { unstable_setRequestLocale } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReFi Medellín',
  description:
    'Somos el primer Nodo Colombiano de ReFiDAO encargado de promover proyectos ReFi en la región. \nEn ReFi Medellín, creemos en los proyectos regenerativos y el impacto transformador que estos tienen. ¡Es hora de pensar diferente y regenerarnos juntos!'
}

export async function generateStaticParams () {
  return [{ lang: 'en' }, { lang: 'es' }]
}
const locales = ['en', 'es']
export default async function RootLayout ({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  pageProps: any
  params: any
}) {
  if (!locales.includes(locale as any)) notFound()
  unstable_setRequestLocale(locale)
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar />
            {children}
            <Toaster />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
