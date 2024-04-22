import { toast } from '@/components/ui/use-toast';

import abreviarHash from '@/functions/abreviateHash';
import { ToastAction } from '@radix-ui/react-toast';
import { useContractWrite } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';

function usePayDebt() {
  const { lendAddress } = useNetworkContractV2();
  const payDebt = useContractWrite({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'payDebt',
    onSuccess: async (txn) => {
      toast({
        title: 'Pago debitado con exito',
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
        title: 'Error al debitar pago',
        description: e.message,
      });
    },
  });
  return payDebt;
}

export { usePayDebt };
