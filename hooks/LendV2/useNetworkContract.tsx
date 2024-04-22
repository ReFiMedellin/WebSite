import { ReFiMedLendContracts } from '@/constants/ReFiMedLendContracts';
import { useNetwork } from 'wagmi';

export function useNetworkContractV2() {
  const { chain } = useNetwork();

  // Aquí puedes agregar las IDs de las cadenas que tu aplicación soporta
  const chainIds = {
    celo: 42220,
    optimism: 10,
    sepolia: 11155111,
  };

  switch (chain?.id) {
    case chainIds.celo:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
      };
    case chainIds.sepolia:
      return {
        lendAddress: ReFiMedLendContracts.sepolia.lendAddress,
      };
    default:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
      };
  }
}
