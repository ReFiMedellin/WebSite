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
import { formatUnits } from 'viem';

type Lend = {
  initialAmount: number;
  currentAmount: number;
  token: string;
  expectPaymentDue: number;
  latestDebtTimestamp: number;
};
function CurrentLends() {
  const [page, setPage] = useState(0);
  const { address } = useAccount();
  const { data, isLoading, isError } = useGetUserLends(address!, page);

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
          <TableCaption>Here you can see a list of your current & recent lends.</TableCaption>
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
                    {formatUnits(lend[0], 3)}
                  </TableCell>
                  <TableCell>{formatUnits(lend[1], 3)}</TableCell>
                  <TableCell>{lend[2]}</TableCell>
                  <TableCell>{Number(lend[3])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {!isLoading && !isError && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total debt</TableCell>
                <TableCell className='text-right'>
                  {(data as bigint[]).reduce((acc, lend) => {
                    return acc + parseFloat(formatUnits(lend, 3));
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
