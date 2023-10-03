import React, { useEffect, useState } from 'react'
import ChainLinkAbi from '@/constants/ABI/chainLinkABI.json'
import { useContractRead, useContractReads } from 'wagmi'
import { zeroAddress } from 'viem'

function useUSDValue () {
  const [address, setAddress] = useState<`0x${string}`>(zeroAddress)
  const { data, error, isFetching } = useContractReads({
    contracts: [
      {
        address,
        // @ts-expect-error
        abi: ChainLinkAbi,
        functionName: 'latestRoundData'
      },
      {
        address,
        // @ts-expect-error
        abi: ChainLinkAbi,
        functionName: 'decimals'
      }
    ],
    cacheTime: 2_000,
    watch: true
  })

  return { data, isFetching, error, setAddress }
}

export  {useUSDValue}
