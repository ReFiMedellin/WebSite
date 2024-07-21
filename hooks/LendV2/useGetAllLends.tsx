import { useQuery, gql } from '@apollo/client';

enum LendStatus {
  ALL = 'all',
  REPAID = 'repaid',
  ACTIVE = 'active',
}

function useGetAllLends(page: number, lendStatus: LendStatus) {
  const getQuery = (lendStatus: LendStatus) => {
    if (lendStatus === LendStatus.ALL) {
      return gql`
        query GetAllLends($skip: Int!) {
          lendings(first: 10, skip: $skip) {
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
        query GetAllLends($skip: Int!, $repaid: Boolean) {
          lendings(first: 10, skip: $skip, where: { repaid: $repaid }) {
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
    variables: lendStatus === LendStatus.ALL ? { skip: page * 10 } : { skip: page * 10, repaid },
  });

  return query;
}

export { useGetAllLends, LendStatus };
