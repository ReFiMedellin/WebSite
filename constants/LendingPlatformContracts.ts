import { CusdAddress, celoLoanAddress, optimismLoanAddress } from '.'

export const contractAddresses = {
  celo: {
    lendAddress: celoLoanAddress,
    tokenAddress: CusdAddress
  },
  optimism: {
    lendAddress: optimismLoanAddress,
    tokenAddress: CusdAddress
  }
}
