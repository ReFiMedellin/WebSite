'use client'
import React, { useEffect, useState } from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { celo } from 'wagmi/chains'
import { GtagManager } from '@/components/utils/GTAG'
import { Metricol } from '@/components/utils/Metricol'

const chains = [celo]
const projectId = '344c4ee91d5e35fec2368e61edfbe959'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function Providers ({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <GtagManager />
      <Metricol />
      {isMounted && (
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      )}
    </>
  )
}

export default Providers
