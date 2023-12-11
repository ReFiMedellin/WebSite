import { toast } from '@/components/ui/use-toast'
import { CusdAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { erc20ABI, useAccount, useContractWrite } from 'wagmi'

function useApproveErc20 () {
  const { address } = useAccount()
  
  const approve = useContractWrite({
    address: CusdAddress,
    abi: erc20ABI,
    functionName: 'approve',
    account: address,
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
