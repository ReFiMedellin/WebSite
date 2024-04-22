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
import { Select } from '../ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAddToken } from '@/hooks/LendV2/useAddToken';

const formSchema = z.object({
  token: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
});
function AddToken() {
  const { writeAsync } = useAddToken();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await writeAsync({
      args: [values.token],
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add token</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='token'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token</FormLabel>
                  <FormControl>
                    <Input placeholder='0x...' {...field} />
                  </FormControl>
                  <FormDescription>The token you want to add</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Add</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { AddToken };
