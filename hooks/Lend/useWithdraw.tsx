import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi, celoLoanAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { useContractWrite } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useWithdraw () {
  const { lendAddress } = useNetworkContract()

  const withdraw = useContractWrite({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'withdrawFunds',
    onSuccess: async txn => {
      toast({
        title: 'Fondos retirados con exito',
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
        title: 'Error al retirar fondos',
        description: e.message
      })
    }
  })
  return withdraw
}

export { useWithdraw }
