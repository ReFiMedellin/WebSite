'use client'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
const erc1155ABI = require('@/constants/ABI/erc1155ABI.json')
import { useRouter } from 'next/navigation'
import BordeBottom from '@/assets/images/Borde-ReFi.png'
import Image from 'next/image'
import Web3 from 'web3'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import LoanPanel from '@/components/LoanPanel'
import { adminAddress } from '@/constants'

function Page () {
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const t = useTranslations('ExclusiveContent')
  const [isMounted, setIsMounted] = useState(false)
  const [hasNFT, setHasNFT] = useState(false)
  const router = useRouter()
  const { address, isDisconnected } = useAccount()
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com/')
  )

  const contract = new web3.eth.Contract(
    erc1155ABI,
    '0x6500dD04e67925A94975D787eF08E2d7786649D9'
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  function isAdmin () {
    return address === adminAddress
  }

  //TODO: Cuando existan, implementar metodos e interfaces para ERC721 y ERC1155, además de una lista de RPC para cada chain

  useEffect(() => {
    if (isDisconnected) return
    async function getNFT () {
      try {
        const data = await contract.methods
          //TODO: FIX THIS TYPE
          // @ts-ignore
          .balanceOfBatch(Array(tokenIds.length).fill(address), tokenIds)
          .call()
        data &&
          data.forEach((nft: bigint) => {
            if (nft > BigInt(0)) {
              setHasNFT(true)
            }
          })
        console.log('Datos del contrato:', data)
      } catch (error) {
        console.error('Error al leer el contrato:', error)
      }
    }
    getNFT()
  }, [])

  if (!isMounted) return null

  if (isDisconnected && isMounted) {
    return (
      <section className='flex py-20 flex-row relative first-bg justify-center items-center h-screen text-white bg-[#1B2731] w-full'>
        <div className='h-screen w-screen flex flex-col gap-5 px-5 lg:px-20 text-center justify-center items-center'>
          <h1 className='font-bold text-4xl lg:text-8xl'>
            {t('hasnotNFT.title')}
          </h1>
          <p className='text-sm md:text-lg lg:text-2xl font-light'>
            {t('hasnotNFT.description')}{' '}
            <Link
              className='hover:text-blue-700 transition-all ease-in-out font-bold'
              href={
                'https://bueno.art/refimedellin/refi-medellin-origin/tokens'
              }
              target='_blank'
            >
              {t('hasnotNFT.link')}
            </Link>
            <br />
          </p>
        </div>
        <Image
          className='absolute bottom-0 w-[100vw] left-0'
          src={BordeBottom}
          alt='Medellin'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          className='fixed  top-0 left-0 z-50 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center'
        >
          <motion.div className='text-black max-w-[90vw] relative bg-white rounded-lg flex flex-col gap-4 p-5 md:p-10'>
            <h2 className='font-bold text-xl text-center lg:text-4xl '>
              {t('modal.title')}
            </h2>
            <p className='text-center'>
              {t('modal.description')}{' '}
              <Link
                className='hover:text-blue-700 transition-all ease-in-out font-bold'
                href={
                  'https://bueno.art/refimedellin/refi-medellin-origin/tokens'
                }
                target='_blank'
              >
                {t('modal.link')}
              </Link>
            </p>
            <div className='flex flex-row gap-5 justify-center items-center'>
              <button
                className='p-3 rounded-md bg-[#4571E1] transition-all ease-in-out hover:bg-[#1a3e98] w-full text-white font-bold'
                onClick={() => router.push('/')}
              >
                {t('modal.button')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    )
  }

  return (
    <section className='flex py-20 flex-row relative first-bg justify-center items-center min-h-screen text-white bg-[#1B2731] w-full'>
      {hasNFT ? (
        <div className='min-h-screen w-screen flex flex-col gap-5 px-5  py-10 lg:px-20 text-center justify-center items-center'>
          <LoanPanel isAdmin={isAdmin()} />
        </div>
      ) : (
        <div className='h-screen w-screen flex flex-col gap-5 px-5 lg:px-20 text-center justify-center items-center'>
          <h1 className='font-bold text-4xl lg:text-8xl'>
            {t('hasnotNFT.title')}
          </h1>
          <p className='text-sm md:text-lg lg:text-2xl font-light'>
            {t('hasnotNFT.description')}{' '}
            <Link
              className='hover:text-blue-700 transition-all ease-in-out font-bold'
              href={
                'https://bueno.art/refimedellin/refi-medellin-origin/tokens'
              }
              target='_blank'
            >
              {t('hasnotNFT.link')}
            </Link>
            <br />
          </p>
        </div>
      )}
      <Image
        className='absolute bottom-0 w-[100vw] left-0'
        src={BordeBottom}
        alt='Medellin'
      />
    </section>
  )
}

export default Page
