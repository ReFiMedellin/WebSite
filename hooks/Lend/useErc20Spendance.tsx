import { CusdAddress, celoLoanAddress } from '@/constants'
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useErc20Spendance () {
  const { tokenAddress } = useNetworkContract()

  const { address } = useAccount()
  const spendance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, celoLoanAddress],
    watch: true
  })
  return spendance
}

export { useErc20Spendance }
