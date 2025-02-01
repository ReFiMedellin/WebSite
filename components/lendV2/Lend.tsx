'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from "lucide-react"

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Address, formatEther } from 'viem';
import { useErc20Balance } from '@/hooks/LendV2/useErc20Balance';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import { useLend } from '@/hooks/LendV2/useLend';
import { useErc20Decimals } from '@/hooks/LendV2/useErc20Decimals';
import { toast } from '../ui/use-toast';
import { useGlobalCurrency } from '@/context/CurrencyContext';

const formSchema = z.object({
  amount: z.number().min(0),
  months: z.string().min(1).max(12),
  token: z.string(),
});

function Lend() {
  const [interests, setInterests] = useState();
  const { writeAsync } = useLend();
  const [isLendLoading, setIsLendLoading] = useState(false)
  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();
  const [token, setToken] = useState('');
  const { lendAddress } = useNetworkContractV2();
  const { data: balance } = useErc20Balance(token as Address, lendAddress);
  const { data: decimals } = useErc20Decimals(token as Address);
  const { currency } = useGlobalCurrency();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLendLoading(true)
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + Number(values.months));
    try {

      await writeAsync({
        args: [
          values.amount,
          values.token,
          Math.floor(currentDate.getTime() / 1000),
        ],
      });
      setIsLendLoading(false)

    } catch (e) {
      console.error(e)
      setIsLendLoading(false)
    }

  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask for a lend</CardTitle>
        <CardDescription>
          If you don&apos; don't have any quota approved, you can ask for one{' '}
          <Link href='https://refimedellin.org'>here</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='100'
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value) || null);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount in {currency} you want to lend
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='months'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Months</FormLabel>
                  <FormControl>
                    <Input placeholder='12' type='number' max={12} {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount of months you want to lend
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='token'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name='token'
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setToken(value as Address);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a token to lend' />
                          </SelectTrigger>
                          <SelectContent>
                            {!isTokensLoading &&
                              !isTokensError &&
                              tokens?.tokens.map(
                                ({
                                  tokenAddress,
                                  symbol,
                                }: {
                                  tokenAddress: Address;
                                  symbol: string;
                                }) => (
                                  <SelectItem
                                    key={tokenAddress}
                                    value={tokenAddress}
                                  >
                                    {symbol}
                                  </SelectItem>
                                )
                              )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormDescription>The token you want to lend</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLendLoading} type='submit'>
              {isLendLoading &&
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              }
              Lend</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {interests && <p>Estimated interests: {interests}</p>}
      </CardFooter>
    </Card>
  );
}

export { Lend };
