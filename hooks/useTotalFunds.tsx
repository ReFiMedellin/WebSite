import { celoLoanAbi, celoLoanAddress } from '@/constants'
import React from 'react'
import { Address } from 'viem'
import { useAccount, useContractRead } from 'wagmi'

function useTotalFunds () {
  const { address } = useAccount()

  const funds = useContractRead({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'getTotalFunds',
    args: [address as Address | '0x000'],
    watch:true
  })

  return funds
}

export { useTotalFunds }
