import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi';

function useErc20Spendance(
  tokenAddress: Address,
  recipent: Address,
  spender: Address
) {
  const spendance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [recipent, spender],
    watch: true,
  });
  return spendance;
}

export { useErc20Spendance };
