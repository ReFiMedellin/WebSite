import { useNetworkContractV2 } from './useNetworkContract';
import { Address, useContractRead } from 'wagmi';
import { ReFiMedLendABI } from '@/constants';

function useFundsV2(tokenAddress: Address) {
  const { lendAddress } = useNetworkContractV2();

  const response = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'tokenFunds',
    watch: true,
    args: ["0x87eb12b84018be3e3914c0380e668638f6229216"],
  });
  return response;
}

export { useFundsV2 };
