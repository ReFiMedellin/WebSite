import { toast } from '@/components/ui/use-toast'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { erc20ABI, useContractWrite } from 'wagmi'

function useApproveErc20 () {
  const approve = useContractWrite({
    address: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
    abi: erc20ABI,
    functionName: 'approve',
    onSuccess: async txn => {
      toast({
        title: 'Capital aprobado con exito',
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
        title: 'Error al aprobar capital',
        description: e.message
      })
    }
  })

  return approve
}

export { useApproveErc20 }
