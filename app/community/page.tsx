'use client';
import React, { useEffect, useState } from 'react';
import { zeroAddress } from 'viem';
import { useAccount, useContractRead } from 'wagmi';
import erc1155ABI from '@/constants/ABI/erc1155ABI.json';
import { useRouter } from 'next/navigation';

function Page() {
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [isMounted, setIsMounted] = useState(false);
  const [hasNFT, setHasNFT] = useState(false);
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();
  const NFT = useContractRead({
    address: '0x6500dD04e67925A94975D787eF08E2d7786649D9',
    abi: erc1155ABI,
    functionName: 'balanceOfBatch',
    args: [Array(tokenIds.length).fill(address), tokenIds],
  });

  console.debug(NFT.data);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isDisconnected) {
    setTimeout(() => {
      router.back();
    }, 2000);
    return <div>Conectate a tu wallet</div>;
  }

  // Verificar si el usuario tiene algún NFT
  if (NFT.data && !hasNFT) {
    (NFT.data as bigint[]).forEach((nft: bigint) => {
      if (nft > BigInt(0)) {
        setHasNFT(true);
      }
    });
  }
 
  return (
    <>
      {hasNFT ?   <div className='h-screen w-screen flex justify-center items-center'>
        <h1 className='font-bold text-8xl'>Disponible pronto!</h1>
    </div> :  <div className='h-screen w-screen flex justify-center items-center'>
        <h1 className='font-bold text-8xl'>No tienes acceso</h1>
    </div>}
    </>
  );
}

export default Page;
