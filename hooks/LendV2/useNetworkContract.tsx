import { ReFiMedLendContracts } from '@/constants/ReFiMedLendContracts';
import { zeroAddress } from 'viem';
import { useNetwork } from 'wagmi';

export const chainIds = {
  celo: 42220,
  optimism: 10,
  sepolia: 11155111,
};

export function useNetworkContractV2() {
  const { chain } = useNetwork();

  switch (chain?.id) {
    case chainIds.celo:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
        eas: zeroAddress,
      };
    case chainIds.sepolia:
      return {
        lendAddress: ReFiMedLendContracts.sepolia.lendAddress,
        eas: ReFiMedLendContracts.sepolia.eas,
      };
    default:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
        eas: zeroAddress,
      };
  }
}
