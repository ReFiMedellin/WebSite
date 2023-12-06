import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { celoLoanAbi, celoLoanAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import React from 'react'
import { parseEther } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useErc20Spendance } from './useErc20Spendance'

function useFundLoan (value?: string) {
  const { data } = useErc20Spendance()

  console.debug((data as bigint) >= (value ? parseEther(value) : BigInt(0)))

  const { config, refetch } = usePrepareContractWrite({
    address: celoLoanAddress,
    abi: celoLoanAbi,
    functionName: 'capitalize',
    args: value ? [parseEther(value)] : [BigInt(0)],
    enabled: false
  })
  const fund = useContractWrite({
    ...config,
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
  console.debug(fund.write)
  return { ...fund, refetch }
}

export { useFundLoan }
