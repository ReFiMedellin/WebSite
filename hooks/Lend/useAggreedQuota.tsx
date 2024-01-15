import { celoLoanAbi, celoLoanAddress } from '@/constants'
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
  console.debug(address, data.data)
  return data
}

export { useAggreedQuota }
