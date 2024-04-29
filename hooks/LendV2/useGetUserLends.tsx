import { Address, useAccount, useContractRead } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';

function useGetUserLends(address: Address, page: number, pageSize = 1) {
  const { lendAddress } = useNetworkContractV2();
  const recentLends = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'getUserLendsPaginated',
    args: [address, page, pageSize.toString()],
    watch: true,
  });
  return recentLends;
}

export { useGetUserLends };