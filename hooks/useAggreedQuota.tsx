import { celoLoanAbi, celoLoanAddress } from '@/constants'
import React from 'react'
import { Address, useContractRead } from 'wagmi'

function useAggreedQuota (address: Address) {
  const data = useContractRead({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'getCurrentQuota',
    watch: true,
    args: [address]
  })
  console.debug(address, data.data)
  return data
}

export { useAggreedQuota }
