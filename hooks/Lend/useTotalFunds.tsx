import { celoLoanAbi } from '@/constants'
import React from 'react'
import { Address } from 'viem'
import { useAccount, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useTotalFunds () {
  const { address } = useAccount()
  const { lendAddress } = useNetworkContract()

  const funds = useContractRead({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'getTotalFunds',
    args: [address as Address | '0x000'],
    watch: true
  })

  return funds
}

export { useTotalFunds }
