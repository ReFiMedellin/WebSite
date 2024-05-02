import { useQuery, gql } from '@apollo/client';
function useGetAllLends(page: number) {
  const GET_TOKENS = gql`
    query GetAllLends {
        lendings(first: 10 , skip: ${page * 10}){
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
  const query = useQuery(GET_TOKENS);
  return query;
}

export { useGetAllLends };
