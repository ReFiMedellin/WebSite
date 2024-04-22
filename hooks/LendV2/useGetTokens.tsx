import { useQuery, gql } from '@apollo/client';
function useGetTokens() {
  const GET_TOKENS = gql`
    query GetTokens {
      tokens {
        tokenAddress
        symbol
      }
    }
  `;
  const query = useQuery(GET_TOKENS);
  return query;
}

export { useGetTokens };
