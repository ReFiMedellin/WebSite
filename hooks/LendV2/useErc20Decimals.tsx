import { Address, erc20ABI, useAccount, useContractRead } from 'wagmi';

function useErc20Decimals(tokenAddress: Address) {
  const balance = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'decimals',
    watch: true,
  });
  return balance;
}

export { useErc20Decimals };
