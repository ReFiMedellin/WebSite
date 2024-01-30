'use client'
import React, { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
const erc1155ABI = require('@/constants/ABI/erc1155ABI.json')
import { redirect, useRouter } from 'next/navigation'
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
  const { chain, chains } = useNetwork()

  const t = useTranslations('ExclusiveContent')
  const [isMounted, setIsMounted] = useState(false)
  const [hasNFT, setHasNFT] = useState(false)
  const router = useRouter()

  const { address, isConnected } = useAccount()
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

  useEffect(() => {
    if (!isConnected) return
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

  if (!isConnected) return redirect('/')

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
