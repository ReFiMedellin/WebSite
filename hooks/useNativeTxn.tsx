import { parseEther } from 'viem'
import { useSendTransaction } from 'wagmi'

function useNativeTxn (amount: number) {
  const {
    data: txnData,
    isLoading: txnLoading,
    isSuccess: txnSuccess,
    isError: txnError,
    error: txnErrorData,
    sendTransactionAsync: sendTransaction
  } = useSendTransaction({
    to: process.env.NEXT_PUBLIC_RECIPENT,
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
