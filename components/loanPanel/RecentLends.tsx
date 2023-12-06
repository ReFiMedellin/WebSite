import React from 'react'
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useRecentLends } from '@/hooks/useRecentLends'

function RecentLends () {
  const { data: recentLends } = useRecentLends()
  return (
    <Card className='min-h-full recent'>
      <CardHeader>
        <CardTitle>Tus prestamos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>ID</TableHead>
              <TableHead className='text-center'>Valor restante</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!recentLends ? (
              <TableRow>No hay prestamos</TableRow>
            ) : (
              //@ts-expect-error
              recentLends.map((loan, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center'>{loan.id}</TableCell>
                  <TableCell className='text-center'>
                    {loan.remainingAmount}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </CardContent>
    </Card>
  )
}

export default RecentLends
