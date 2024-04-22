import React from 'react';
import { useNetworkContractV2 } from './useNetworkContract';
import { Address, useContractRead } from 'wagmi';
import { ReFiMedLendABI } from '@/constants';

function useFunds() {
  const { lendAddress } = useNetworkContractV2();

  const response = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'funds',
    watch: true,
  });
  return response;
}

export { useFunds };
