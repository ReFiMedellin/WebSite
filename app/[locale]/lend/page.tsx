'use client';
import React, { useState } from 'react';
import Web3 from 'web3';
import erc1155ABI from '@/constants/ABI/erc1155ABI.json';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Page() {
  const [hasNft, setHasNft] = useState(false);
  const t = useTranslations('ExclusiveContent');
  const { address } = useAccount();
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com/')
  );

  const contract = new web3.eth.Contract(
    erc1155ABI,
    '0x6500dD04e67925A94975D787eF08E2d7786649D9'
  );
  async function getNFT() {
    try {
      const data = await contract.methods
        //TODO: FIX THIS TYPE
        // @ts-ignore
        .balanceOfBatch(Array(tokenIds.length).fill(address), tokenIds)
        .call();
      data &&
        data.forEach((nft: bigint) => {
          if (nft > BigInt(0)) {
            setHasNft(true);
          }
        });
      console.log('Datos del contrato:', data);
    } catch (error) {
      console.error('Error al leer el contrato:', error);
      return false;
    }
  }
  getNFT();
  if (!hasNft) {
    return (
      <section className='flex p-20 flex-col relative first-bg justify-center items-center min-h-screen text-white text-center gap-4 bg-[#1B2731] w-full'>
        <h1 className='font-bold text-4xl lg:text-8xl'>
          {t('hasnotNFT.title')}
        </h1>
        <p className='text-sm md:text-lg lg:text-2xl font-light'>
          {t('hasnotNFT.description')}{' '}
          <Link
            className='hover:text-blue-700  transition-all ease-in-out font-bold'
            href={'https://bueno.art/refimedellin/refi-medellin-origin/tokens'}
            target='_blank'
          >
            {t('hasnotNFT.link')}
          </Link>
          <br />
        </p>
      </section>
    );
  }

  return (
    <main className='bg-[#1B2731] min-h-screen flex justify-center items-center'>

    </main>
  );
}
