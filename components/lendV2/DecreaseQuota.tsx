import React from 'react';
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
import { useDecreaseQuota } from '@/hooks/LendV2/useDecreaseQuota';

const formSchema = z.object({
  amount: z.string(),
  user: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
});

function DecreaseQuota() {
  const { writeAsync } = useDecreaseQuota();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await writeAsync({
      args: [values.user, values.amount],
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
                    <Input placeholder='0' {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount you want to decrease
                  </FormDescription>
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
                    The address you want to decrease
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Decrease</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { DecreaseQuota };
