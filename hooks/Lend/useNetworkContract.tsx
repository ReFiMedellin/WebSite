import { contractAddresses } from '@/constants/LendingPlatformContracts'
import { useSearchParams } from 'next/navigation'

export function useNetworkContract () {
  const network = useSearchParams().get('network')
  switch (network) {
    case 'celo':
      return {
        lendAddress: contractAddresses.celo.lendAddress,
        tokenAddress: contractAddresses.celo.tokenAddress
      }
    case 'optimism':
      return {
        lendAddress: contractAddresses.optimism.lendAddress,
        tokenAddress: contractAddresses.optimism.tokenAddress
      }
    default:
      return {
        lendAddress: contractAddresses.celo.lendAddress,
        tokenAddress: contractAddresses.celo.tokenAddress
      }
  }
}
