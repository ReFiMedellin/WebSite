import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import abreviarHash from '@/functions/abreviateHash';
import React from 'react';
import { useContractWrite } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';

function useDecreaseQuota() {
  const { lendAddress } = useNetworkContractV2();
  const decrease = useContractWrite({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'decreaseQuota',
    onSuccess: async (txn) => {
      toast({
        title: 'Quota decreased successfully',
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
        title: 'Error while decreasing quota ',
        description: e.message,
      });
    },
  });
  return decrease;
}

export { useDecreaseQuota };
