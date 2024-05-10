import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Address, formatUnits, isAddress, zeroAddress } from 'viem';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import { useGetAllLends } from '@/hooks/LendV2/useGetAllLends';
import { getDaysBetween } from '@/functions/daysBetween';
import { useGetAllLendsPerUser } from '@/hooks/LendV2/useGetAllLendsPerUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import abreviarHash from '@/functions/abreviateHash';
import { useGetUser } from '@/hooks/LendV2/useGetUser';
import { getDate } from '@/functions/getDate';

function UsersManager() {
  const [page, setPage] = useState(0);

  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUser(
    isAddress(currentUser ?? '') ? (currentUser as Address) : zeroAddress
  );
  const {
    data,
    loading: isLoading,
    error: isError,
  } = useGetAllLendsPerUser(page, currentUser);
  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();

  console.debug(user);

  return (
    <Card
      style={{
        gridArea: 'user',
      }}
    >
      <CardHeader>
        <CardTitle>Users Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder='Search users'
          onChange={(e) => setCurrentUser(e.target.value as Address)}
        />

        {currentUser && (
          <Table>
            <TableCaption>A list of the user lends.</TableCaption>
            <TableHeader>
              <TableRow>
                {currentUser && !isAddress(currentUser) && (
                  <TableHead>User</TableHead>
                )}
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
                    {currentUser && !isAddress(currentUser) && (
                      <TableCell className='flex flex-row gap-2 items-center '>
                        <Button
                          className='w-8 h-8'
                          variant={'outline'}
                          onClick={() =>
                            navigator.clipboard.writeText(lend.lender)
                          }
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </Button>
                        {abreviarHash(lend.lender)}
                      </TableCell>
                    )}

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
        )}
        <div className='flex pt-6 flex-row gap-4'>
          <Button
            disabled={isLoading || !data || data.lendings.length === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>

          <Button disabled={page == 0} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
        </div>
      </CardContent>
      {isAddress(currentUser ?? '') && !isLoadingUser && isErrorUser && (
        <CardFooter className='flex flex-col gap-4 w-full   items-start'>
          <h3>User info</h3>
          <div className='grid grid-cols-2 w-full'>
            <Label>Quota</Label>
            <p>${formatUnits((user as bigint[])[0], 3)}</p>
            <Label>Funds</Label>
            <p>${formatUnits((user as bigint[])[1], 3)}</p>
            <Label>Interest shares</Label>
            <p>{Number((user as bigint[])[2])}</p>
            <Label>Quota</Label>
            <p>{getDate(Number((user as bigint[])[3]))}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export { UsersManager };
