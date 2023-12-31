import { celoLoanAbi, celoLoanAddress } from '@/constants'
import { useContractRead } from 'wagmi'

function useGetLenders (index: number = 0) {
  const lenders = useContractRead({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'getWhitelistedUserDetails',
    watch: true,
    args: [index]
  })
  console.debug({lenders})
  return lenders

}

export { useGetLenders }
