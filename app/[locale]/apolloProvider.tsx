import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';
import { useGlobalCurrency } from '@/context/CurrencyContext';

export default function ApolloProviderNetworkBased({
  children,
}: {
  children: React.ReactNode;
}) {
  const { subgraph } = useNetworkContractV2();
  const { currency } = useGlobalCurrency();

  const subgraphStudio = currency === 'COP' ? '102458' : '72352';

  // Sustituye la subgraph ID según currency:

  const client = new ApolloClient({
    uri: `https://api.studio.thegraph.com/query/${subgraphStudio}/${subgraph}/version/latest`,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
