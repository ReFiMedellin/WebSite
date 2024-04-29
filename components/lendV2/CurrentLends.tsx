import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAccount } from 'wagmi';
import { useGetUserLends } from '@/hooks/LendV2/useGetUserLends';
import { Address, formatUnits } from 'viem';
import { Button } from '../ui/button';
import { getDaysBetween } from '@/functions/daysBetween';
import { usePayDebt } from '@/hooks/LendV2/usePayDebt';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';

type Lend = {
  initialAmount: number;
  currentAmount: number;
  token: string;
  expectPaymentDue: number;
  latestDebtTimestamp: number;
};
function CurrentLends() {
  const [page, setPage] = useState(1);
  const { address } = useAccount();
  const { data, isLoading, isError } = useGetUserLends(address!, page);
  const { writeAsync } = usePayDebt();
  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();

  const handleOnPayDebt = async (
    amount: number,
    token: Address,
    index: number
  ) => {
    writeAsync({
      args: [amount, token, index],
    });
  };


  return (
    <Card
      style={{
        gridArea: 'lends',
      }}
      className='h-full w-full'
    >
      <CardHeader>
        <CardTitle>Your Current Lends</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Here you can see a list of your current & recent lends.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Initial amount</TableHead>
              <TableHead>Current amount</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Days remaining</TableHead>
            </TableRow>
          </TableHeader>
          {!isLoading && !isError && (
            <TableBody>
              {(data as any[]).map((lend, key) => (
                <TableRow key={key}>
                  <TableCell className='font-medium'>
                    {formatUnits(lend.initialAmount, 3)}
                  </TableCell>
                  <TableCell>{formatUnits(lend.currentAmount, 3)}</TableCell>
                  <TableCell>
                    {!isTokensLoading && !isTokensError
                      ? tokens.tokens.filter(
                          ({ tokenAddress }: { tokenAddress: Address }) =>
                            tokenAddress === lend.token.toLowerCase()
                        )[0].symbol
                      : lend.token}
                  </TableCell>
                  <TableCell>
                    {getDaysBetween(Number(lend.expectPaymentDue))}
                  </TableCell>
                  <TableCell>
                    <Button>Pay debt</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {!isLoading && !isError && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total debt</TableCell>
                <TableCell className='text-right'>
                  {(data as any[]).reduce((acc, lend) => {
                    return acc + parseFloat(formatUnits(lend.currentAmount, 3));
                  }, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}

export { CurrentLends };
