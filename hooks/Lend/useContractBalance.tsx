import { Address, zeroAddress } from 'viem'
import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useContractBalance () {
  const { tokenAddress, lendAddress } = useNetworkContract()

  const balance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [lendAddress as Address]
  })
  return balance
}

export { useContractBalance }
