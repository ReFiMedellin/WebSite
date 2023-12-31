import { CusdAddress, celoLoanAbi, celoLoanAddress } from '@/constants'
import React from 'react'
import { zeroAddress } from 'viem'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'

function useErc20Balance () {
  const { address } = useAccount()
  const balance = useContractRead({
    address: CusdAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [address as `0x${string}`]
  })
  return balance
}

export { useErc20Balance }
