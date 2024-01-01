import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from 'react-icons/rx'
import Juan from '@/assets/images/PFP-Juan.webp'
import Tereza from '@/assets/images/PFP-Tereza.webp'
import Alejandro from '@/assets/images/PFP-Alejandro.webp'
import xflypeztyc from '@/assets/images/PFP-0xflypeztic.webp'
import Ximena from '@/assets/images/PFP-Ximena.webp'
import Eamon from '@/assets/images/PFP-Eamon.webp'
import Edward from '@/assets/images/PFP-Edward.webp'
import GDG from '@/assets/images/PFP-Green Digital Guardians.webp'
// import Inkom from '@/assets/images/PFP-Inkom.webp'
import DotLabs from '@/assets/images/PFP-Dotlabs.webp'

const Patners = () => {
  const patners = [
    {
      name: 'Green Digital Guardians',
      role: 'Partner',
      imageSrc: GDG,
      socialLinks: {
        twitter: 'https://twitter.com/dg_guardians',
        instagram: 'https://www.instagram.com/dg_guardians/',
        telegram: 'https://t.me/dg_guardians',
        linkedin: 'https://www.linkedin.com/company/dg-guardians/'
      }
    },
    {
      name: 'Inkom.io',
      role: 'Treasury',
      imageSrc: Inkom,
      socialLinks: {
        twitter: 'https://twitter.com/inkom_io',
        instagram: 'https://www.instagram.com/inkom.io/',
        telegram: 'https://t.me/inkom-io'
      }
    },
    {
      name: 'DotLabs()',
      role: 'Educational Partner',
      imageSrc: DotLabs,
      socialLinks: {}
    }
  ]

  return (
    <div className='flex-row flex flex-wrap justify-center items-center gap-5'>
      {patners.map((member, index) => (
        <div
          key={index}
          className='relative h-76 md:h-[17rem] w-64 md:w-52 pt-5 overflow-y-hidden rounded-md shadow-lg flex flex-col gap-2 bg-slate-200 group hover:bg-slate-300'
        >
          <div className='px-5 text-center'>
            <h1 className='text-start w-full font-bold text-sm'>
              {member.name}
            </h1>
            <p className='w-full text-start font-light text-sm text-slate-700'>
              {member.role}
            </p>
          </div>
          <Image
            src={member.imageSrc}
            alt='Refi member'
            className='w-full max-h-full rounded-b-md'
          />
          <div className='bg-slate-200 absolute bottom-0 left-0 w-full h-12 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='flex text-sm h-full flex-row justify-center items-center gap-5'>
              <Link
                className='logo_teammember'
                target='_blank'
                href={
                  member.socialLinks.twitter ? member.socialLinks.twitter : ''
                }
              >
                <RxTwitterLogo />
              </Link>
              <Link
                className='logo_teammember'
                target='_blank'
                href={
                  member.socialLinks.instagram
                    ? member.socialLinks.instagram
                    : ''
                }
              >
                <RxInstagramLogo />
              </Link>
              <Link
                className='logo_teammember'
                target='_blank'
                href={
                  member.socialLinks.telegram ? member.socialLinks.telegram : ''
                }
              >
                <FaTelegramPlane />
              </Link>
              <Link
                className='logo_teammember'
                target='_blank'
                href={
                  member.socialLinks.linkedin ? member.socialLinks.linkedin : ''
                }
              >
                <RxLinkedinLogo />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { Patners }
