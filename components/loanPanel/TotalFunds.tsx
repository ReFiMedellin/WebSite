'use client';

import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AnimatedPrice from './AnimatedPrice';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  useContractBalance,
  useNumbers,
  useTotalFunds,
  useWithdraw,
} from '@/hooks';
import { formatEther } from 'viem';
import { useNetwork } from 'wagmi';
import { currencies } from '@/constants';

function TotalFunds({ isAdmin }: { isAdmin: boolean }) {
  const { data: totalValue, isLoading } = useTotalFunds();
  const { writeAsync: withdraw } = useWithdraw();
  const { formatFiat } = useNumbers();
  const { chain } = useNetwork();
  const currentCurrency = currencies[chain?.id as keyof typeof currencies];

  const { data } = useContractBalance();
  const handleOnWithdraw = async () => {
    try {
      await withdraw();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='w-full h-full total'>
      {isLoading ? (
        <Card>
          <CardHeader className='chart flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Ganancias totales
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Skeleton className='h-[15px] w-1/2'></Skeleton>

            <p className='text-xs text-muted-foreground'>+20.1% en total</p>
          </CardContent>
          <CardFooter>
            <Button>Retirar fondos</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader className='chart flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Saldo </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <AnimatedPrice
              price={parseFloat(formatEther(totalValue as bigint))}
            />
            {isAdmin && (
              <p className='w-full text-start'>
                Saldo actual del contrato:{' '}
                <strong>
                  {currentCurrency}
                  {data ? formatFiat(formatEther(data as bigint)) : formatFiat(0)}
                </strong>
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleOnWithdraw}>Retirar fondos</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export { TotalFunds };
