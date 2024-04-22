import { toast } from '@/components/ui/use-toast';
import { CusdAddress, ReFiMedLendABI } from '@/constants';
import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import React from 'react';
import { Address, erc20ABI, useAccount, useContractWrite } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';

function useAddToken() {
  const { lendAddress } = useNetworkContractV2();
  const addToken = useContractWrite({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'addToken',
    onSuccess: async (txn) => {
      toast({
        title: 'Token added successfully',
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
        title: 'Error while adding token',
        description: e.message,
      });
    },
  });

  return addToken;
}

export { useAddToken };
