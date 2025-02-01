import { useNetworkContractV2 } from './useNetworkContract';
import { Address, useContractRead } from 'wagmi';
import { ReFiMedLendABI } from '@/constants';

function useFundsV2(tokenAddress: Address) {
  const { lendAddress } = useNetworkContractV2();

  const response = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'tokenFunds',
    watch: true,
    args: [tokenAddress],
  });
  return response;
}

export { useFundsV2 };
