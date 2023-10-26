'use client'
import Script from 'next/script'

export const GtagManager = () => {
  return (
    <div>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-EP8RXYX2BL' />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-EP8RXYX2BL');
        `}
      </Script>
    </div>
  )
}
