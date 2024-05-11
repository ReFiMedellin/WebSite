import { ReFiMedLendContracts } from '@/constants/ReFiMedLendContracts';
import { useNetwork } from 'wagmi';

export const chainIds = {
  celo: 42220,
  optimism: 10,
  sepolia: 11155111,
  polygon: 137,
};

export function useNetworkContractV2() {
  const { chain } = useNetwork();

  switch (chain?.id) {
    case chainIds.celo:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
        eas: ReFiMedLendContracts.celo.eas,
        subgraph: 'refimedlending-celo'
      };
    case chainIds.sepolia:
      return {
        lendAddress: ReFiMedLendContracts.sepolia.lendAddress,
        eas: ReFiMedLendContracts.sepolia.eas,
        subgraph: 'refimedlending'
      };
    case chainIds.optimism: {
      return {
        lendAddress: ReFiMedLendContracts.optimism.lendAddress,
        eas: ReFiMedLendContracts.optimism.eas,
        subgraph: 'refimedlending-optimism'
      };
    }
    case chainIds.polygon:
      return {
        lendAddress: ReFiMedLendContracts.polygon.lendAddress,
        eas: ReFiMedLendContracts.polygon.eas,
        subgraph: 'refimedlending-polygon'
      };
    default:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
        eas: ReFiMedLendContracts.celo.eas,
        subgraph: 'refimedlending-celo'
      };
  }
}
