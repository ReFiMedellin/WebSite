import { erc20ABI, useAccount, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useErc20Balance () {
  const { tokenAddress } = useNetworkContract()

  const { address } = useAccount()
  const balance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [address as `0x${string}`]
  })
  return balance
}

export { useErc20Balance }
