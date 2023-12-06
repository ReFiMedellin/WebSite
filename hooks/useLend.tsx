import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi, celoLoanAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { useAccount, useContractWrite } from 'wagmi'

function useLend () {
  const { address } = useAccount()

  const loan = useContractWrite({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'requestLoan',
    account: address,
    onSuccess: async txn => {
      toast({
        title: 'Prestamo solicitado con exito',
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
        title: 'Error al solicitar prestamo',
        description: e.message
      })
    }
  })
  return loan
}

export { useLend }
