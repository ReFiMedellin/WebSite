import { toast } from '@/components/ui/use-toast'
import { CusdAddress } from '@/constants'
import abreviarHash from '@/functions/abreviateHash'
import { ToastAction } from '@radix-ui/react-toast'
import React from 'react'
import { Address, erc20ABI, useAccount, useContractWrite } from 'wagmi'

function useApproveErc20 (tokenAddress: Address) {
  const { address } = useAccount()

  const approve = useContractWrite({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'approve',
    account: address,
    onSuccess: async txn => {
      toast({
        title: 'Capital approved successfully',
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
        title: 'Error while approving capital',
        description: e.message
      })
    }
  })

  return approve
}

export { useApproveErc20 }
