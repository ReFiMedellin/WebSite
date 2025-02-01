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
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useFund } from '@/hooks/LendV2/useFund';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import {
  Address,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from 'viem';
import { useErc20Spendance } from '@/hooks/LendV2/useErc20Spendance';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';
import { useAccount } from 'wagmi';
import { useErc20Decimals } from '@/hooks/LendV2/useErc20Decimals';
import { useApproveErc20 } from '@/hooks/LendV2/useApproveErc20';
import { useGlobalCurrency } from '@/context/CurrencyContext';

const formSchema = z.object({
  amount: z.number({ description: 'The value must be a number' }).min(0),
  token: z.string().optional(),
});

function Fund() {
  const { writeAsync: fund } = useFund();
  const [token, setToken] = useState<Address>(zeroAddress);
  const [amount, setAmount] = useState<null | number>();
  const { address } = useAccount();
  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();
  const { lendAddress } = useNetworkContractV2();
  const { data: spendance } = useErc20Spendance(token, address!, lendAddress);
  const { data: decimals } = useErc20Decimals(token);
  const { writeAsync } = useApproveErc20(token);
  const { currency } = useGlobalCurrency();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fund({
      args: [values.amount, values.token],
    });
  }

  const handleApprove = async () => {
    await writeAsync({
      args: [
        lendAddress,
        parseUnits((amount || 0)?.toString(), decimals || 18),
      ],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund the protocol</CardTitle>
        <CardDescription>
          <Link href='#'>Help us to grow the protocol by funding it</Link>
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
                      placeholder='0'
                      type='number'
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value) || null);
                        setAmount(parseFloat(e.target.value) || null);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount in {currency} you want to fund
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
                            <SelectValue placeholder='Select a token to fund' />
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
                  <FormDescription>The token you want to fund</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {spendance &&
            parseFloat(formatUnits(spendance, decimals || 18)) >=
              (amount || 0) ? (
              <Button type='submit'>Fund</Button>
            ) : (
              <Button type='button' onClick={handleApprove}>
                Approve
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { Fund };
