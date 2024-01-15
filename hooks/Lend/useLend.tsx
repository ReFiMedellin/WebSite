import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useLend () {
  const { address } = useAccount()
  const { lendAddress } = useNetworkContract()

  const loan = useContractWrite({
    address: lendAddress,
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
