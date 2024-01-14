import abiCeloLoan from './ABI/CeloLoan.json'
export const celoLoanAddress =
  (process.env.NEXT_PUBLIC_CELO_LOAN_CONTRACT_ADDRESS as `0x${string}`) ||
  '0x000000'
export const optimismLoanAddress =
  (process.env.NEXT_PUBLIC_OPTIMISM_LOAN_CONTRACT_ADDRESS as `0x${string}`) ||
  '0x000000'
export const CusdAddress =
  (process.env.NEXT_PUBLIC_CUSD_ADDRESS as `0x${string}`) || '0x000000'
export const GloDollarAddress =
  (process.env.NEXT_PUBLIC_GLODDOLLAR_ADDRESS as `0x${string}`) || '0x000000'
export const celoLoanAbi = abiCeloLoan
export const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || '0x000000'
