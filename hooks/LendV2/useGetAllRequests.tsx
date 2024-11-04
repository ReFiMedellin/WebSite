import { useQuery, gql } from "@apollo/client";

export enum RequestStatus {
  ALL = "all",
  SIGNED = "signed",
  COMPLETED = "completed",
}

function useGetAllLends(page: number, lendStatus: RequestStatus) {
  const getQuery = (lendStatus: RequestStatus) => {
    if (lendStatus === RequestStatus.ALL) {
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

  const repaid =
    lendStatus === RequestStatus.SIGNED
      ? true
      : lendStatus === RequestStatus.COMPLETED
      ? false
      : undefined;

  const query = useQuery(getQuery(lendStatus), {
    variables:
      lendStatus === RequestStatus.ALL
        ? { skip: page * 10 }
        : { skip: page * 10, repaid },
  });

  return query;
}

export { useGetAllLends, RequestStatus as LendStatus };
