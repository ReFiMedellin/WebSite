import { useQuery, gql } from '@apollo/client';
function useGetAllLendsPerUser(page: number, lender: string | undefined) {
  const GET_LENDS = gql`
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
  const query = useQuery(GET_LENDS, {
    variables: {
      first: 10,
      skip: page * 10,
      lender: (lender ?? '').toLowerCase(),
    },
  });
  return query;
}

export { useGetAllLendsPerUser };
