import { toast } from '@/components/ui/use-toast';
import { celoLoanAbi, ReFiMedLendABI } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import { useContractWrite } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';

function useWithdraw() {
  const { lendAddress } = useNetworkContractV2();

  const withdraw = useContractWrite({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'withdraw',
    onSuccess: async (txn) => {
      toast({
        title: 'Withdrawal successful',
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
        title: 'Error while withdrawing funds',
        description: e.message,
      });
    },
  });
  return withdraw;
}

export { useWithdraw };
