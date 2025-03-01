import React, { useState } from 'react';
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
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRequestQuotaIncrease } from '@/hooks/LendV2/useRequestQuotaIncrease';
import { Address } from 'viem';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import { zeroAddress } from 'viem';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '../ui/select';
const formSchema = z.object({
  amount: z.number().min(0),
  token: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid token address'),
  user: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
  signers: z
    .array(
      z.object({
        value: z
          .string()
          .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
        id: z.string(),
      })
    )
    .min(3, 'At least 3 signers are required')
    .max(10, 'No more than 10 signers are allowed'),
});

function QuotaManagerV2() {
  const { writeAsync } = useRequestQuotaIncrease();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signers: [],
    },
  });
  const { data: tokens } = useGetTokens();
  const [tokenAddress, setTokenAddress] = useState<Address>(zeroAddress);
  const { fields, append, remove } = useFieldArray<z.infer<typeof formSchema>>({
    control: form.control,
    name: 'signers',
    keyName: 'id',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const addresses = values.signers.map((signer) => signer.value);
    await writeAsync({
      args: [values.user, values.token, values.amount, addresses],
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quota Manager</CardTitle>
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
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value) || null);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The amount you want to spend
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
                    <Select
                      key={tokenAddress}
                      onValueChange={(value) => {
                        setTokenAddress(value as Address);
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a token' />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens?.tokens.map((token: any) => (
                          <SelectItem
                            key={token.tokenAddress}
                            value={token.tokenAddress}
                          >
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>The token you want to spend</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='user'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input placeholder='0x...' {...field} />
                  </FormControl>
                  <FormDescription>
                    The address you want to spend
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='signers'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signers</FormLabel>
                  <FormControl>
                    <div className='flex flex-col gap-2'>
                      {fields.map((field, index) => (
                        <div className='flex flex-col gap-2' key={field.id}>
                          <Input
                            placeholder='Enter signer address'
                            {...form.register(
                              `signers.${index}.value` as const
                            )}
                          />
                          <Button
                            variant='destructive'
                            onClick={() => remove(index)}
                            type='button'
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant='outline'
                        onClick={() =>
                          append({
                            value: '',
                            id: Math.random().toString(),
                          })
                        }
                        type='button'
                      >
                        Add Signer
                      </Button>
                    </div>
                  </FormControl>

                  <FormDescription>
                    The addresses you want to add as signers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Request</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { QuotaManagerV2 };
