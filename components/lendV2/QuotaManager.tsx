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
import { useRequestQuotaIncrease } from '@/hooks/LendV2/useRequestQuotaIncrease';
const formSchema = z.object({
  amount: z.number().min(0).optional().default(0),
  user: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'),
  signers: z
    .array(z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid wallet address'))
    .min(3, 'At least 3 signers are required')
    .max(10, 'No more than 10 signers are allowed'),
});

function QuotaManager() {
  const { writeAsync } = useRequestQuotaIncrease();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signers: [''],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'signers',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await writeAsync({
      args: [values.user, values.amount, values.signers],
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
                            {...form.register(`signers.${index}` as const)}
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
                        onClick={() => append('')}
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

export { QuotaManager };
