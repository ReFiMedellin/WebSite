import { useContractRead } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';

function useGetCurrentLendInterests( index: number) {
  const { lendAddress } = useNetworkContractV2();

  const interests = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'calculateInterests',
    args: [index],
    watch: true,
  });
  return interests;
}

export { useGetCurrentLendInterests };
