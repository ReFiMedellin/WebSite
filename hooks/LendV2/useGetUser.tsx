import React from 'react';
import { useNetworkContractV2 } from './useNetworkContract';
import { Address, useContractRead } from 'wagmi';
import { ReFiMedLendABI } from '@/constants';

function useGetUser(address: Address) {
  const { lendAddress } = useNetworkContractV2();

  const response = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'user',
    watch: true,
    args: [address],
  });
  return response;
}

export { useGetUser };
