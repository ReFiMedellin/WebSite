import { parseEther } from 'viem'
import { useSendTransaction } from 'wagmi'

function useNativeTxn (amount: number, chain:'Ethereum' | 'Polygon' | 'Celo' | 'OP Mainnet' | 'Arbitrum One') {

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
    sendTransactionAsync: sendTransaction
  } = useSendTransaction({
    to: recipents[chain],
    value: amount ? parseEther(amount.toString()) : parseEther('0')
  })
  return {
    txnData,
    txnLoading,
    txnSuccess,
    txnError,
    txnErrorData,
    sendTransaction
  }
}

export { useNativeTxn }
