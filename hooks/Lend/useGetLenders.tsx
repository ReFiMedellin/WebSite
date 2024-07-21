import { celoLoanAbi } from '@/constants'
import { useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useGetLenders (index: number = 0) {
  const { lendAddress } = useNetworkContract()

  const lenders = useContractRead({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'getWhitelistedUserDetails',
    watch: true,
    args: [index]
  })
  return lenders
}

export { useGetLenders }
