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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useGetAllLends } from '@/hooks/LendV2/useGetAllLends';
import { Address, formatUnits } from 'viem';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import { getDaysBetween } from '@/functions/daysBetween';
import { Button } from '../ui/button';

function LendsManager() {
  const [page, setPage] = useState(0);
  const { data, loading: isLoading, error: isError } = useGetAllLends(page);
  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();
  console.debug(data);

  return (
    <Card
      style={{
        gridArea: 'lends',
      }}
      className='align-top w-full'
    >
      <CardHeader>
        <CardTitle>Current lends</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of the whole lends.</TableCaption>
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
              {(data.lendings as any[]).map((lend, key) => (
                <TableRow key={key}>
                  <TableCell className='font-medium'>
                    {Number(lend.amount)}
                  </TableCell>
                  <TableCell>
                    {formatUnits(lend.currentAmount ?? 0, 3)}
                  </TableCell>
                  <TableCell>
                    {!isTokensLoading && !isTokensError
                      ? tokens.tokens.filter(
                          ({ tokenAddress }: { tokenAddress: Address }) =>
                            tokenAddress === lend.token.toLowerCase()
                        )[0].symbol
                      : lend.token}
                  </TableCell>
                  <TableCell>
                    {/* {getDaysBetween(Number(lend.expectPaymentDue))} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </CardContent>
      <CardFooter className='flex flex-row gap-4'>
        <Button
          disabled={isLoading || !data || data.lendings.length === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>

        <Button disabled={page == 0} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LendsManager;
