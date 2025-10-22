'use client';
import React, { useEffect, useState } from 'react';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import {
  configureChains,
  createConfig,
  sepolia,
  useConnect,
  WagmiConfig,
} from 'wagmi';
import { celo, arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { GtagManager } from '@/components/utils/GTAG';
import { Metricol } from '@/components/utils/Metricol';
import ApolloProviderNetworkBased from './apolloProvider';
import { GlobalCurrencyProvider } from '@/context/CurrencyContext';
import { InjectedConnector } from 'wagmi/connectors/injected';

const chains = [
  {
    ...celo,
    rpcUrls: {
      default: {
        http: [
          'https://rpc.ankr.com/celo/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
        webSocket: [
          'wss://ws.ankr.com/celo/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
      },
      public: {
        http: [
          'https://rpc.ankr.com/celo/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
        webSocket: [
          'wss://ws.ankr.com/celo/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
      },
    },
  },
  arbitrum,
  mainnet,
  optimism,
  {
    ...polygon,
    rpcUrls: {
      default: {
        http: [
          'https://rpc.ankr.com/polygon/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
        webSocket: [
          'wss://ws.ankr.com/polygon/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
      },
      public: {
        http: [
          'https://rpc.ankr.com/polygon/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
        webSocket: [
          'wss://ws.ankr.com/polygon/ce29f559c4c7897dd275a46c6d99296b8efe3a3810193fda29402c8edb38f88c',
        ],
      },
    },
  },
  {
    ...sepolia,
    rpcUrls: {
      default: {
        http: ['https://rpc.ankr.com/eth_sepolia'],
        webSocket: ['wss://ws.ankr.com/eth_sepolia'],
      },
      public: {
        http: ['https://rpc.ankr.com/eth_sepolia'],
        webSocket: ['wss://ws.ankr.com/eth_sepolia'],
      },
    },
  },
];
const projectId = '7326ebd4b7670327335ce12403d94bec';

const { publicClient } = configureChains(
  [mainnet],
  [w3mProvider({ projectId })]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <GlobalCurrencyProvider>
      <WagmiConfig config={wagmiConfig}>
        <ApolloProviderNetworkBased>{children}</ApolloProviderNetworkBased>
        
      </WagmiConfig>
      <GtagManager />
      <Metricol />
    </GlobalCurrencyProvider>
  );
}

export default Providers;
