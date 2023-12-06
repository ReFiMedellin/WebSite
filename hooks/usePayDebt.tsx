import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi, celoLoanAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import { useContractWrite } from 'wagmi'

function usePayDebt () {
  const payDebt = useContractWrite({
    address: celoLoanAddress,
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
