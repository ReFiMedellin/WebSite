import React from 'react';

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
import { useGetSignatureRequests } from '@/hooks/LendV2/useGetSignatureRequests';
import { Address } from 'viem';
import { Button } from '../ui/button';

export type Request = {
  amount: number;
  to: string;
  currentSignatures: number;
};

function CurrentSignatures() {
  const { address } = useAccount();
  const { data, loading, error } = useGetSignatureRequests([
    address!.toLocaleLowerCase() as Address,
  ]);

  return (
    <Card
      style={{
        gridArea: 'signatures',
      }}
      className='h-full w-full'
    >
      <CardHeader>
        <CardTitle>Pending signatures</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>🌟 In this section, you&apos;ll find the credit requests from your friends who have asked for your signature as a reference. Take a moment to review them and provide your signature if you support their request. They&apos;ll appreciate it! 🙌.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Credit Requested </TableHead>
              <TableHead>Friend Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading &&
              !error &&
              data.userQuotaRequests.map((request, key) => (
                <TableRow key={key}>
                  <TableCell className='font-medium'>
                    {request.amount}
                  </TableCell>
                  <TableCell>{request.user.id}</TableCell>
                  <TableCell>
                    <Button>Sign</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { CurrentSignatures };
