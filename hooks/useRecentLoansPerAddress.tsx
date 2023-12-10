import React from 'react'
import { celoLoanAbi, celoLoanAddress } from '@/constants'
import { Address, useContractRead } from 'wagmi'

function useRecentLoansPerAddress (address: Address) {
  const recentLends = useContractRead({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'getActiveLoans',
    args: [address as Address, 0, 10],
    watch: true
  })
  return recentLends
}

export { useRecentLoansPerAddress }
