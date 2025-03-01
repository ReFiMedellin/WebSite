import {
  easAddressArbitrum,
  easAddressCelo,
  easAddressOptimism,
  easAddressPolygon,
  easAddressSepolia,
  ReFiMedLendAddressArbitrum,
  ReFiMedLendAddressCelo,
  ReFiMedLendAddressCeloV2,
  ReFiMedLendAddressOptimism,
  ReFiMedLendAddressPolygon,
  ReFiMedLendAddressSepolia,
} from '.';

export const ReFiMedLendContracts = {
  celo: {
    lendAddress: ReFiMedLendAddressCelo,
    eas: easAddressCelo,
  },
  celoV2: {
    lendAddress: ReFiMedLendAddressCeloV2,
    eas: easAddressCelo,
  },
  sepolia: {
    lendAddress: ReFiMedLendAddressSepolia,
    eas: easAddressSepolia,
  },
  optimism: {
    lendAddress: ReFiMedLendAddressOptimism,
    eas: easAddressOptimism,
  },
  polygon: {
    lendAddress: ReFiMedLendAddressPolygon,
    eas: easAddressPolygon,
  },
  arbitrum: {
    lendAddress: ReFiMedLendAddressArbitrum,
    eas: easAddressArbitrum,
  }
};
