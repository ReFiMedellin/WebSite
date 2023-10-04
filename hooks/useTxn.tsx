import { Abi, parseUnits } from 'viem'
import { erc20ABI, useAccount, useContractWrite, useToken } from 'wagmi'
import usdtAbi from '@/constants/ABI/usdtABI.json'

type address = `0x${string}`

export default function useTxn (
  tokenContract: address,
  amount: number,
  chain: 'Ethereum' | 'Polygon' | 'Celo' | 'OP Mainnet' | 'Arbitrum One'
) {
  // console.debug(recipents)
  const { address } = useAccount()

  const {
    data,
    isLoading: decimalsLoading,
    isSuccess: decimalSuccess
  } = useToken({
    address: tokenContract
  })

  const recipents = {
    Ethereum: process.env.NEXT_PUBLIC_ETHEREUM_RECIPENT,
    Polygon: process.env.NEXT_PUBLIC_POLYGON_RECIPENT,
    Celo: process.env.NEXT_PUBLIC_CELO_RECIPENT,
    'OP Mainnet': process.env.NEXT_PUBLIC_OPTIMISM_RECIPENT,
    'Arbitrum One': process.env.NEXT_PUBLIC_ARBITRUM_RECIPENT
  }

  const {
    data: txnData,
    isLoading: txnLoading,
    isSuccess: txnSuccess,
    isError: txnError,
    error: txnErrorData,
    writeAsync: sendTransaction
  } = useContractWrite({
    address: tokenContract,
    abi: (tokenContract === '0xdac17f958d2ee523a2206206994597c13d831ec7'
      ? usdtAbi
      : erc20ABI) as Abi,
    account: address,
    functionName: 'transfer',
    args: [
      recipents[chain],
      data && amount ? parseUnits(amount.toString(), data.decimals) : BigInt(0)
    ]
  })
  return {
    txnData,
    txnLoading,
    txnSuccess,
    txnError,
    txnErrorData,
    sendTransaction,
    decimalsLoading,
    decimalSuccess
  }
}

export { useTxn }
