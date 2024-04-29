import { zeroAddress } from 'viem';
import {
  easAddressSepolia,
  ReFiMedLendAddressCelo,
  ReFiMedLendAddressSepolia,
} from '.';

export const ReFiMedLendContracts = {
  celo: {
    lendAddress: ReFiMedLendAddressCelo,
    eas: zeroAddress,
  },
  sepolia: {
    lendAddress: ReFiMedLendAddressSepolia,
    eas: easAddressSepolia,
  },
};
