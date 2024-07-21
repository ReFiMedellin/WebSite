import { useQuery, gql } from '@apollo/client';
import { LendStatus } from './useGetAllLends';

function useGetAllLendsPerUser(page: number, lender: string | undefined, lendStatus: LendStatus) {
  const getQuery = (lendStatus: LendStatus) => {
    if (lendStatus === LendStatus.ALL) {
      return gql`
        query GetAllLends($first: Int!, $skip: Int!, $lender: String) {
          lendings(
            first: $first
            skip: $skip
            where: { lender_contains: $lender }
          ) {
            id
            lender
            amount
            token
            currentAmount
            transactionHash
            paymentDue
            interests
          }
        }
      `;
    } else {
      return gql`
        query GetAllLends($first: Int!, $skip: Int!, $lender: String, $repaid: Boolean) {
          lendings(
            first: $first
            skip: $skip
            where: { lender_contains: $lender, repaid: $repaid }
          ) {
            id
            lender
            amount
            token
            currentAmount
            transactionHash
            paymentDue
            interests
          }
        }
      `;
    }
  };

  const repaid = lendStatus === LendStatus.REPAID ? true : lendStatus === LendStatus.ACTIVE ? false : undefined;

  const query = useQuery(getQuery(lendStatus), {
    variables: lendStatus === LendStatus.ALL 
      ? { first: 10, skip: page * 10, lender: (lender ?? '').toLowerCase() }
      : { first: 10, skip: page * 10, lender: (lender ?? '').toLowerCase(), repaid },
  });

  return query;
}

export { useGetAllLendsPerUser };
