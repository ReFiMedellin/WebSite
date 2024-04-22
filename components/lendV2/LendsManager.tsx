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

function LendsManager() {
  return (
    <Card
      style={{
        gridArea: 'lends',
      }}
      className='h-full w-full'
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
          {/* {!isLoading && !isError && (
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
          )} */}
        </Table>
      </CardContent>
    </Card>
  );
}

export default LendsManager;
