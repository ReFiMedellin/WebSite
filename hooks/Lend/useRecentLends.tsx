import { celoLoanAbi } from '@/constants'
import { Address, useAccount, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useRecentLends () {
  const { lendAddress } = useNetworkContract()
  const { address } = useAccount()
  const recentLends = useContractRead({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'getActiveLoans',
    args: [address as Address, 0, 10],
    watch: true
  })
  console.debug(recentLends.data)
  return recentLends

}

export { useRecentLends }
