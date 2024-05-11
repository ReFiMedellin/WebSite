import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';

function ApolloProviderNetworkBased({
  children,
}: {
  children: React.ReactNode;
}) {
  const { subgraph } = useNetworkContractV2();
  const client = new ApolloClient({
    uri: `https://api.studio.thegraph.com/query/72352/${subgraph}/version/latest`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloProviderNetworkBased;
