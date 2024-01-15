'use client'
import { useIsMobile } from '@/hooks'
import { Web3Button, useWeb3Modal } from '@web3modal/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RxTextAlignJustify } from 'react-icons/rx'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useAccount } from 'wagmi'
import { Dialog } from '@radix-ui/react-dialog'
import { ToastAction } from '@radix-ui/react-toast'
import { toast } from './ui/use-toast'
import { Button } from './ui/button'
function Navbar () {
  const t = useTranslations('Navbar')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const [isMounted, setIsMounted] = useState(false)

  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 25) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }

    // Event listener
    window.addEventListener('scroll', onScroll)

    // Limpiar el listener
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  type Routes = {
    link: string
  }

  const routes: Routes[] = [
    {
      link: '/'
    },
    {
      link: '/community?network=celo'
    },
    {
      link: 'https://blog.refimedellin.org/'
    }
  ]

  if (!isMounted) {
    return null
  }

  function handleCommunity (link: string) {
    if (isConnected) {
      return (
        <Link onClick={() => setIsMenuOpen(false)} href={link}>
          {t(`${link === '/community?network=celo' ? '/community' : link}`)}
        </Link>
      )
    } else {
      return (
        <button
          className='bg-none border-none text-white font-bold'
          onClick={() => {
            toast({
              title: t('toast.title'),
              description: t('toast.description'),
              action: (
                <ToastAction altText='Connect wallet'>
                  <Button
                    variant={'ghost'}
                    onClick={() => {
                      open()
                    }}
                  >
                    {t('toast.connect')}
                  </Button>
                </ToastAction>
              )
            })
          }}
        >
          {t(`${link}`)}
        </button>
      )
    }
  }

  return (
    <nav
      className={`${
        scroll ? 'top-0 fixed' : 'top-6 absolute'
      }   w-full py-6 z-50  bg-black backdrop-blur-md bg-opacity-40 shadow-lg`}
    >
      <ul className='w-full text-white flex px-10 flex-row gap-2 justify-between font-bold items-center'>
        {isMobile ? (
          <>
            <RxTextAlignJustify
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-4xl font-bold transition-all ease-in-out ${
                isMenuOpen && 'rotate-90'
              }`}
            />
            <Web3Button />
          </>
        ) : (
          <>
            {routes.map(({ link }, index) => (
              <li key={index}>
                {link === '/community?network=celo' ? (
                  handleCommunity(link)
                ) : (
                  <Link onClick={() => setIsMenuOpen(false)} href={link}>
                    {t(`${link}`)}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Web3Button />
            </li>
          </>
        )}
      </ul>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className='flex overflow-hidden  flex-col gap-6  px-10 text-white font-bold text-xl items-start
          justify-center'
            initial={{ opacity: 0, height: '0px' }}
            animate={{ opacity: 1, height: '180px' }}
            exit={{ opacity: 0, height: '0px' }}
          >
            {' '}
            {routes.map(({ link }, index) => (
              <li key={index}>
                {link === '/community?network=celo' ? (
                  handleCommunity(link)
                ) : (
                  <Link onClick={() => setIsMenuOpen(false)} href={link}>
                    {t(`${link}`)}
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
