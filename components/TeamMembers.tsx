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
import Inkom from '@/assets/images/PFP-Inkom.webp'
import DotLabs from '@/assets/images/PFP-Dotlabs.webp'

const TeamMembers = () => {
  const team = [
    {
      name: 'Juan Giraldo',
      role: 'Founder',
      imageSrc: Juan,
      socialLinks: {
        twitter: 'https://twitter.com/JuanJGiraldoC',
        instagram: 'https://www.instagram.com/juanjosegiraldo/',
        telegram: '@juanjgiraldoc',
        linkedin: 'https://www.linkedin.com/in/juancamp1987/'
      }
    },
    {
      name: 'Tereza Bizkova',
      role: 'Co-Founder',
      imageSrc: Tereza,
      socialLinks: {
        twitter: 'https://twitter.com/TerezaBizkova',
        instagram: 'https://www.instagram.com/lightlust/',
        telegram: '@alejandro99so',
        linkedin: 'https://www.linkedin.com/in/alejandro99so/'
      }
    },
    {
      name: 'Alejandro Soto',
      role: 'Co-Founder',
      imageSrc: Alejandro,
      socialLinks: {
        twitter: 'https://twitter.com/alejandro99so',
        instagram: 'https://www.instagram.com/alejandro99so/',
        telegram: '@juanjgiraldoc',
        linkedin: 'https://www.linkedin.com/in/juancamp1987/'
      }
    },
    {
      name: 'Ximena Monclou',
      role: 'Legal',
      imageSrc: Ximena,
      socialLinks: {
        twitter: 'https://twitter.com/ximemonclou',
        instagram: 'https://www.instagram.com/ximemonclou/',
        telegram: '@ximemonclou',
        linkedin: 'https://www.linkedin.com/in/ximenamonclou/'
      }
    },
    {
      name: 'Edward',
      role: 'Technical Stuff',
      imageSrc: Edward,
      socialLinks: {
        twitter: 'https://twitter.com/JuanJGiraldoC',
        instagram: 'https://www.instagram.com/juanjosegiraldo/',
        telegram: '@juanjgiraldoc',
        linkedin: 'https://www.linkedin.com/in/juancamp1987/'
      }
    },
    {
      name: '0xflypeztyc',
      role: 'Branding & Social',
      imageSrc: xflypeztyc,
      socialLinks: {
      }
    },
    {
      name: 'Eamon',
      role: 'Co-Founder',
      imageSrc: Eamon,
      socialLinks: {
        telegram: '@cryptochimba',
      }
    },
    {
      name: 'Green Digital Guardians',
      role: 'Partner',
      imageSrc: GDG,
      socialLinks: {
        twitter: 'https://twitter.com/dg_guardians',
        instagram: 'https://www.instagram.com/dg_guardians/',
        telegram: '@dg_guardians',
        linkedin: 'https://www.linkedin.com/company/dg-guardians/'
      }
    },
    {
      name: 'Inkom.io',
      role: 'Treasury',
      imageSrc: Inkom,
      socialLinks: {
      }
    },
    {
      name: 'DotLabs()',
      role: 'Educational Partner',
      imageSrc: DotLabs,
      socialLinks: {
      }
    }
  ]

  return (
    <div className='flex-row flex flex-wrap justify-center items-center gap-5'>
      {team.map((member, index) => (
        <div
          key={index}
          className='relative h-76 w-64 pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200 group hover:bg-slate-300'
        >
          <div className='px-5 text-center'>
            <h1 className='text-start w-full font-bold text-lg'>
              {member.name}
            </h1>
            <p className='w-full text-start font-light text-sm text-slate-700'>
              {member.role}
            </p>
          </div>
          <Image
            src={member.imageSrc}
            alt='Refi member'
            className='w-full h-full rounded-b-md'
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

export default TeamMembers
