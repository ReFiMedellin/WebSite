import { toast } from '@/components/ui/use-toast';
import { celoLoanAbi, ReFiMedLendABI } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { waitForTransaction } from '@wagmi/core'


function useLend() {
  const { address } = useAccount();
  const { lendAddress } = useNetworkContractV2();

  const loan = useContractWrite({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'requestLend',
    account: address,
    onSuccess: async (txn) => {
      await waitForTransaction({
        hash: txn.hash,
      })

      toast({
        title: 'Loan requested successfully',
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
        ),
      });
    },
    onError: (e) => {
      toast({
        title: 'Error while requesting loan',
        description: e.message,
      });
    },
  });
  return loan;
}

export { useLend };
