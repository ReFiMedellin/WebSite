import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { Address, useContractRead, useContractWrite } from 'wagmi'
import { useNetworkContract } from './useNetworkContract'

function useManageQuota (address?: Address) {
  const { lendAddress } = useNetworkContract()
  const { data: currentQuota, isLoading } = useContractRead({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'getCurrentQuota',
    args: [address]
  })
  const incrementQuota = useContractWrite({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'increaseQuota',
    onSuccess: async txn => {
      toast({
        title: 'Cupo aumentado con exito',
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
        title: 'Error al aumentar cupo',
        description: e.message
      })
    }
  })
  const decrementQuota = useContractWrite({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'decreaseQuota',
    onSuccess: async txn => {
      toast({
        title: 'Cupo disminuido con exito',
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
        title: 'Error al disminuir cupo',
        description: e.message
      })
    }
  })

  return {
    currentQuota,
    incrementQuota,
    decrementQuota,
    isLoading
  }
}

export { useManageQuota }
