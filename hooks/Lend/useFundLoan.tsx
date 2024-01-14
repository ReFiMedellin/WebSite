import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi, celoLoanAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import React from 'react'
import { parseEther } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useErc20Spendance } from './useErc20Spendance'
import { useNetworkContract } from './useNetworkContract'

function useFundLoan () {
  const { lendAddress } = useNetworkContract()
  const fund = useContractWrite({
    address: lendAddress,
    abi: celoLoanAbi,
    functionName: 'capitalize',
    onSuccess: async txn => {
      toast({
        title: 'Capital añadido con exito',
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
  return fund
}

export { useFundLoan }
