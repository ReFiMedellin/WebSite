import { Address, zeroAddress } from 'viem'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useContractBalance () {
  const { tokenAddress } = useNetworkContract()

  const balance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [tokenAddress as Address]
  })
  return balance
}

export { useContractBalance }
