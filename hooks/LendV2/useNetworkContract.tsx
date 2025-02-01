import {
  schemaUIDArbitrum,
  schemaUIDCelo,
  schemaUIDCeloV2,
  schemaUIDOptimism,
  schemaUIDPolygon,
  schemaUIDSepolia,
} from '@/constants';
import { ReFiMedLendContracts } from '@/constants/ReFiMedLendContracts';
import { useGlobalCurrency } from '@/context/CurrencyContext';
import { useNetwork } from 'wagmi';

export const chainIds = {
  celo: 42220,
  optimism: 10,
  sepolia: 11155111,
  polygon: 137,
  arbitrum: 42161,
};

export function useNetworkContractV2() {
  const { chain } = useNetwork();
  const { currency } = useGlobalCurrency();

  switch (chain?.id) {
    case chainIds.celo:
      return {
        lendAddress: currency === 'COP' ? ReFiMedLendContracts.celoV2.lendAddress : ReFiMedLendContracts.celo.lendAddress,
        eas: ReFiMedLendContracts.celo.eas,
        subgraph: 'refimedlending-celo',
        schema: currency === 'COP' ? schemaUIDCeloV2 : schemaUIDCelo,
      };
    case chainIds.sepolia:
      return {
        lendAddress:  ReFiMedLendContracts.sepolia.lendAddress,
        eas: ReFiMedLendContracts.sepolia.eas,
        subgraph: 'refimedlend',
        schema: schemaUIDSepolia,
      };
    case chainIds.optimism: {
      return {
        lendAddress: ReFiMedLendContracts.optimism.lendAddress,
        eas: ReFiMedLendContracts.optimism.eas,
        subgraph: 'refimedlending-optimism',
        schema: schemaUIDOptimism,
      };
    }
    case chainIds.polygon:
      return {
        lendAddress: ReFiMedLendContracts.polygon.lendAddress,
        eas: ReFiMedLendContracts.polygon.eas,
        subgraph: 'refimedlending-polygon',
        schema: schemaUIDPolygon,
      };
    case chainIds.arbitrum:
      return {
        lendAddress: ReFiMedLendContracts.arbitrum.lendAddress,
        eas: ReFiMedLendContracts.arbitrum.eas,
        subgraph: 'refimedlending-arbitrum',
        schema: schemaUIDArbitrum,
      };
    default:
      return {
        lendAddress: ReFiMedLendContracts.celo.lendAddress,
        eas: ReFiMedLendContracts.celo.eas,
        subgraph: 'refimedlending-celo',
        schema: schemaUIDCelo,
      };
  }
}
