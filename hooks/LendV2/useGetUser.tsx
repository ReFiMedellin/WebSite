import React from 'react';
import { useNetworkContractV2 } from './useNetworkContract';
import { Address, useContractRead } from 'wagmi';
import { ReFiMedLendABI } from '@/constants';
import { useGlobalCurrency } from '@/context/CurrencyContext';
import { useGetTokens } from './useGetTokens';
import { zeroAddress } from 'viem';

function useGetUser(address: Address) {
  const { lendAddress } = useNetworkContractV2();
  const { currency } = useGlobalCurrency();
  const { data: tokens } = useGetTokens();

  const response = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: currency === 'COP' ? 'getUserFunds' : 'user',
    watch: true,
    args:
      currency === 'COP'
        ? [address, tokens?.tokens[0]?.tokenAddress ?? zeroAddress]
        : [address],
  });
  console.debug({response});
  return response;
}

export { useGetUser };
