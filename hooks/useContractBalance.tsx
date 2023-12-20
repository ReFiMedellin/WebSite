import { CusdAddress, celoLoanAbi, celoLoanAddress } from '@/constants'
import React from 'react'
import { Address, zeroAddress } from 'viem'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'

function useContractBalance () {
  const balance = useContractRead({
    address: CusdAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [celoLoanAddress as Address]
  })
  return balance
}

export { useContractBalance }
