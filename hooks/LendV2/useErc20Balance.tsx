import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi';

function useErc20Balance(tokenAddress: Address, recipent: Address) {
  const balance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    watch: true,
    args: [recipent],
  });
  return balance;
}

export { useErc20Balance };
