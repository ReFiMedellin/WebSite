import { celoLoanAbi } from '@/constants'
import React from 'react'
import { Address, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useAggreedQuota (address: Address) {
  const { lendAddress } = useNetworkContract()
  
  const data = useContractRead({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'getCurrentQuota',
    watch: true,
    args: [address]
  })
  return data
}

export { useAggreedQuota }
