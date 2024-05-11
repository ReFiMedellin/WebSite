import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi';
import { useNetworkContractV2 } from './useNetworkContract';
import { ReFiMedLendABI } from '@/constants';
import { keccak256 } from 'viem';
import { id } from 'ethers';

function useIsAdmin() {
  const { lendAddress } = useNetworkContractV2();
  const { address } = useAccount();
  const hasRole = useContractRead({
    address: lendAddress,
    abi: ReFiMedLendABI,
    functionName: 'hasRole',
    watch: true,
    args: [id('ADMIN'), address],
  });
  return hasRole;
}

export { useIsAdmin };
