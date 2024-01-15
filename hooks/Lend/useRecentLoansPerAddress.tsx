import React from 'react'
import { celoLoanAbi } from '@/constants'
import { Address, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useRecentLoansPerAddress (address: Address) {
  const { lendAddress } = useNetworkContract()
  const recentLends = useContractRead({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'getActiveLoans',
    args: [address as Address, 0, 10],
    watch: true
  })
  return recentLends
}

export { useRecentLoansPerAddress }
