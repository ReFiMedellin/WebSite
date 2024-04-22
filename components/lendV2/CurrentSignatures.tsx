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

export type Request = {
  amount: number;
  to: string;
  currentSignatures: number;
};

function CurrentSignatures({ requests }: { requests: Request[] }) {
  return (
    <Card className='h-full w-full'>
      <CardHeader>
        <CardTitle>Pending signatures</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your pending quota request signatures.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Requested quota </TableHead>
              <TableHead>User Address</TableHead>
              <TableHead>Current Signatures</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request, key) => (
              <TableRow key={key}>
                <TableCell className='font-medium'>{request.amount}</TableCell>
                <TableCell>{request.to}</TableCell>
                <TableCell>{request.currentSignatures}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { CurrentSignatures };
