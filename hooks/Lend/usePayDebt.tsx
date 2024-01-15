import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import { useContractWrite } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function usePayDebt () {
  const { lendAddress } = useNetworkContract()
  const payDebt = useContractWrite({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'payDebt',
    onSuccess: async txn => {
      toast({
        title: 'Pago debitado con exito',
        description: abreviarHash(txn.hash),
        action: (
          <ToastAction altText='Copy'>
            <button
              className='Button'
              onClick={async () =>
                await navigator.clipboard.writeText(txn.hash)
              }
            >
              Copy
            </button>
          </ToastAction>
        )
      })
    },
    onError: e => {
      toast({
        title: 'Error al debitar pago',
        description: e.message
      })
    }
  })
  return payDebt
}

export { usePayDebt }
