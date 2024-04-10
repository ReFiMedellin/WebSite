'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Select } from '../ui/select';

const formSchema = z.object({
  amount: z.number().min(0),
  months: z.string().min(1).max(12),
  token: z.string(),
});

function Lend() {
  const [interests, setInterests] = useState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask for a lend</CardTitle>
        <CardDescription>
          <Link href='#'>
            If you don&apost have any quota, you can ask for that here
          </Link>
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
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount in USD you want to lend
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
                    <Input type='number' max={12} {...field} />
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
                    <Select {...field} />
                  </FormControl>
                  <FormDescription>The token you want to lend</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Lend</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Estimated interests: {interests}</p>
      </CardFooter>
    </Card>
  );
}

export { Lend };
