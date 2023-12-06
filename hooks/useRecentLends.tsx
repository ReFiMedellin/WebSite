import { celoLoanAbi, celoLoanAddress } from '@/constants'
import { Address, useAccount, useContractRead } from 'wagmi'

function useRecentLends () {
  const { address } = useAccount()
  const recentLends = useContractRead({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'getActiveLoans',
    args: [address as Address, 10, 10]
  })
  return recentLends
}

export { useRecentLends }
