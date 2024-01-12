import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

function Header () {
  const t = useTranslations('Landing')

  return (
    <div className='w-screen  overflow-hidden  bg-purple-950 text-white'>
      <div className='animate font-bold'>
        <Link target='_blank' href='https://lu.ma/refimedellinpublic'>
          {t('header')}
        </Link>
      </div>
    </div>
  )
}

export { Header }
