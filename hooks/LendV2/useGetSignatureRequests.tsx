import { gql, useQuery } from '@apollo/client';
import { Address } from 'viem';

function useGetSignatureRequests(signers: Address[]) {
  const GET_USER_QUOTA_REQUESTS = gql`
    query GetUserQuotaRequests($signerAddress: [String!]) {
      userQuotaRequests(
        where: {
          signers_contains: $signerAddress
          signedBy_not_contains: $signerAddress
          complete: false
        }
      ) {
        id
        amount
        successfulSigns
        signers
        signedBy
        complete
        user {
          id
        }
      }
    }
  `;
  const query = useQuery(GET_USER_QUOTA_REQUESTS, {
    variables: {
      signerAddress: signers,
    },
  });
  return query;
}

export { useGetSignatureRequests };
