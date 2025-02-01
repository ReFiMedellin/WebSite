import { Address } from 'viem';
import abiCeloLoan from './ABI/CeloLoan.json';
export const celoLoanAddress =
  (process.env.NEXT_PUBLIC_CELO_LOAN_CONTRACT_ADDRESS as `0x${string}`) ||
  '0x000000';
export const optimismLoanAddress =
  (process.env.NEXT_PUBLIC_OPTIMISM_LOAN_CONTRACT_ADDRESS as `0x${string}`) ||
  '0x000000';
export const CusdAddress =
  (process.env.NEXT_PUBLIC_CUSD_ADDRESS as `0x${string}`) || '0x000000';
export const GloDollarAddress =
  (process.env.NEXT_PUBLIC_GLODDOLLAR_ADDRESS as `0x${string}`) || '0x000000';
export const celoLoanAbi = abiCeloLoan;
export const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || '0x000000';
export const currencies = {
  42220: 'cUSD',
  10: 'USDGLO',
};
import RMLABI from './ABI/ReFiMedLend.json';
export const ReFiMedLendABI = RMLABI;

export const schemaUIDSepolia = process.env
  .NEXT_PUBLIC_REFIMED_LEND_SCHEMA_SEPOLIA as Address;

export const easAddressSepolia = process.env
  .NEXT_PUBLIC_EAS_ADDRESS_SEPOLIA as Address;

export const ReFiMedLendAddressSepolia = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_SEPOLIA as Address;

export const ReFiMedLendAddressCelo = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_CELO as Address;

export const ReFiMedLendAddressCeloV2 = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_CELO_V2 as Address;

export const schemaUIDCelo = process.env
  .NEXT_PUBLIC_REFIMED_LEND_SCHEMA_CELO as Address;
export const schemaUIDCeloV2 = process.env
  .NEXT_PUBLIC_REFIMED_LEND_SCHEMA_CELO_V2 as Address;

export const easAddressCelo = process.env
  .NEXT_PUBLIC_EAS_ADDRESS_CELO as Address;

export const ReFiMedLendAddressOptimism = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_OPTIMISM as Address;

export const schemaUIDOptimism = process.env
  .NEXT_PUBLIC_REFIMED_LEND_SCHEMA_OPTIMISM as Address;

export const easAddressOptimism = process.env
  .NEXT_PUBLIC_EAS_ADDRESS_OPTIMISM as Address;

export const ReFiMedLendAddressPolygon = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_POLYGON as Address;

export const schemaUIDPolygon = process.env
  .NEXT_PUBLIC_REFIMED_LEND_SCHEMA_POLYGON as Address;

export const easAddressPolygon = process.env
  .NEXT_PUBLIC_EAS_ADDRESS_POLYGON as Address;


export const ReFiMedLendAddressArbitrum = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_ARBITRUM as Address;

export const schemaUIDArbitrum = process.env
  .NEXT_PUBLIC_REFIMED_LEND_SCHEMA_ARBITRUM as Address;

export const easAddressArbitrum = process.env
  .NEXT_PUBLIC_EAS_ADDRESS_ARBITRUM as Address;


  