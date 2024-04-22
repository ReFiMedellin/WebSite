import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import abreviarHash from '@/functions/abreviateHash';
import React from 'react';
import { useContractWrite } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';

function useRequestQuotaIncrease() {
  const { lendAddress } = useNetworkContractV2();
  const request = useContractWrite({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'requestIncreaseQuota',
    onSuccess: async (txn) => {
      toast({
        title: 'Quota increase requested successfully',
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
        title: 'Error while requesting quota increase',
        description: e.message,
      });
    },
  });
  return request;
}

export { useRequestQuotaIncrease };
