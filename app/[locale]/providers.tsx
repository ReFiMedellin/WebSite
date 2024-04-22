'use client';
import React, { useEffect, useState } from 'react';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import { celo, arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { GtagManager } from '@/components/utils/GTAG';
import { Metricol } from '@/components/utils/Metricol';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
const chains = [celo, arbitrum, mainnet, optimism, polygon, sepolia];
const projectId = '344c4ee91d5e35fec2368e61edfbe959';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const client = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/72352/refimedlending/version/latest',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      <GtagManager />
      <Metricol />
      {isMounted && (
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      )}
    </ApolloProvider>
  );
}

export default Providers;
