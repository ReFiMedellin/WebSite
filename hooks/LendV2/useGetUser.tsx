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
    args: ['0x5E15DBf75d3819Dd9DA31Fc159Ce5bc5f3751AB0'],
  });
  return response;
}

export { useGetUser };
