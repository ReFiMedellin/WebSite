import { CusdAddress, celoLoanAddress } from '@/constants'
import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi'

function useErc20Spendance () {
  const { address } = useAccount()
  const spendance = useContractRead({
    address: CusdAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, celoLoanAddress],
    watch: true
  })
  return spendance
}

export { useErc20Spendance }
