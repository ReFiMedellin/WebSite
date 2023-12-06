import { celoLoanAbi, celoLoanAddress } from '@/constants'
import { Address, useAccount, useContractRead } from 'wagmi'

function useRecentLends () {
  const { address } = useAccount()
  const recentLends = useContractRead({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'getActiveLoans',
    args: [address as Address, 0, 10],
    watch: true
  })
  return recentLends
}

export { useRecentLends }
