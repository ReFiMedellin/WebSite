import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
import abreviarHash from '@/functions/abreviateHash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

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
              <TableHead>User</TableHead>
              <TableHead>Initial amount</TableHead>
              <TableHead>Current amount</TableHead>
              <TableHead>Interests</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Days remaining</TableHead>
            </TableRow>
          </TableHeader>
          {!isLoading && !isError && (
            <TableBody>
              {(data.lendings as any[]).map((lend, key) => (
                <TableRow key={key}>
                  <TableCell className='flex flex-row gap-2 items-center '>
                    <Button
                      className='w-8 h-8'
                      variant={'outline'}
                      onClick={() => navigator.clipboard.writeText(lend.lender)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </Button>
                    {abreviarHash(lend.lender)}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {formatUnits(lend.amount, 3)}
                  </TableCell>
                  <TableCell>{formatUnits(lend.currentAmount, 3)}</TableCell>
                  <TableCell>{formatUnits(lend.interests, 3)}</TableCell>
                  <TableCell>
                    {!isTokensLoading && !isTokensError
                      ? tokens.tokens.filter(
                          ({ tokenAddress }: { tokenAddress: Address }) =>
                            tokenAddress === lend.token.toLowerCase()
                        )[0].symbol
                      : lend.token}
                  </TableCell>
                  <TableCell>
                    {getDaysBetween(Number(lend.paymentDue))}
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
