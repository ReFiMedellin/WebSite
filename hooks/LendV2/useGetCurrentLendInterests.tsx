import { useAccount, useContractRead } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';

function useGetCurrentLendInterests(index: number) {
  const { lendAddress } = useNetworkContractV2();
  const {address} = useAccount()


  const interests = useContractRead({
    address: lendAddress,
    account: address,
    abi: ReFiMedLendABI,
    functionName: 'calculateInterests',
    args: [index],
    watch: true,
  });
  return interests;
}

export { useGetCurrentLendInterests };
