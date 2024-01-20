import { contractAddresses } from '@/constants/LendingPlatformContracts'
import { useSearchParams } from 'next/navigation'
import { useNetwork } from 'wagmi'

export function useNetworkContract () {
  const { chain } = useNetwork()

  // Aquí puedes agregar las IDs de las cadenas que tu aplicación soporta
  const chainIds = {
    celo: 42220,
    optimism: 10
  }

  switch (chain?.id) {
    case chainIds.celo:
      return {
        lendAddress: contractAddresses.celo.lendAddress,
        tokenAddress: contractAddresses.celo.tokenAddress
      }
    case chainIds.optimism:
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
