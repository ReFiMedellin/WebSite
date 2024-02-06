import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { formatEther, parseEther } from 'viem';
import {
  useApproveErc20,
  useErc20Balance,
  useFundLoan,
  useLend,
  useNumbers,
  useWithdraw,
} from '@/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useErc20Spendance } from '@/hooks/Lend/useErc20Spendance';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useNetworkContract } from '@/hooks/Lend/useNetworkContract';
import { useNetwork } from 'wagmi';
import { currencies } from '@/constants';

function FundLend() {
  const fundForm = useForm();
  const lendForm = useForm();
  const approveForm = useForm();

  const { writeAsync: approve } = useApproveErc20();
  const { writeAsync: fund } = useFundLoan();
  const { writeAsync: loan } = useLend();
  const { chain } = useNetwork();
  const { data: CusdBalance, isLoading: isCusdBalanceLoading } =
    useErc20Balance();
  const { data: CusdSpendance } = useErc20Spendance();
  const { formatFiat } = useNumbers();

  const currentCurrency = currencies[chain?.id as keyof typeof currencies];

  const { lendAddress } = useNetworkContract();
  async function onFundSubmit(values: any) {
    try {
      if (
        parseInt(CusdSpendance ? formatEther(CusdSpendance) : '0') <
        values.amount
      )
        return;
      await fund({
        args: [parseEther(values.amount)],
      });
      fundForm.reset({
        amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function onApproveSubmit(values: any) {
    try {
      await approve({
        args: [lendAddress, parseEther(values.amount)],
      });
      approveForm.reset({
        amount: '',
      });
      fundForm.reset({
        amount: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function onLendSubmit(values: any) {
    try {
      await loan({
        args: [parseEther(values.amount), values.months],
      });
      lendForm.reset({
        amount: '',
        months: '',
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Tabs defaultValue='Loan' className='fundLend'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='Loan'>Prestar</TabsTrigger>
        <TabsTrigger value='Fund'>Añadir capital</TabsTrigger>
      </TabsList>
      <TabsContent value='Loan'>
        <Card>
          <CardHeader>
            <CardTitle>Pedir un prestamo</CardTitle>
            <CardDescription>
              Recuerda que para acceder a un prestamo debes pedir la validación
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Form {...lendForm}>
              <form
                onSubmit={lendForm.handleSubmit(onLendSubmit)}
                className='flex flex-col  items-start gap-4'
              >
                <FormField
                  control={lendForm.control}
                  name='amount'
                  rules={{
                    required: 'Este campo es requerido',
                  }}
                  render={({ field }) => (
                    <FormItem className='text-start  w-full'>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='100' {...field} />
                      </FormControl>
                      <FormDescription>
                        Recuerda que el monto ingresado es en {currentCurrency}$
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={lendForm.control}
                  name='months'
                  rules={{
                    required: 'Este campo es requerido',
                    min: {
                      value: 0,
                      message: 'La cantidad de meses debe ser mayor a 0',
                    },
                    max: {
                      value: 12,
                      message:
                        'La cantidad de meses debe ser menor o igual a 12',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className='text-start  w-full'>
                      <FormLabel>Meses</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Escoge una cantidad de meses' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='1'>1</SelectItem>
                              <SelectItem value='2'>2</SelectItem>
                              <SelectItem value='3'>3</SelectItem>
                              <SelectItem value='4'>4</SelectItem>
                              <SelectItem value='5'>5</SelectItem>
                              <SelectItem value='6'>6</SelectItem>
                              <SelectItem value='7'>7</SelectItem>
                              <SelectItem value='8'>8</SelectItem>
                              <SelectItem value='9'>9</SelectItem>
                              <SelectItem value='10'>10</SelectItem>
                              <SelectItem value='11'>11</SelectItem>
                              <SelectItem value='12'>12</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Pedir prestamo</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='Fund'>
        <Card>
          <CardHeader>
            <CardTitle>Fondear</CardTitle>
            <CardDescription>
              Apoya a la comunidad de RefiMedellín
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Form {...fundForm}>
              <form
                onSubmit={fundForm.handleSubmit(onFundSubmit)}
                className='flex flex-col  items-start gap-4'
              >
                <FormField
                  control={fundForm.control}
                  name='amount'
                  rules={{
                    required: 'Este campo es requerido',
                    min: {
                      value: 0,
                      message: 'El monto debe ser mayor a 0',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className='text-start  w-full'>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type='number' placeholder='100' {...field} />
                      </FormControl>
                      <FormDescription>
                        {CusdBalance
                          ? `Balance: ${currentCurrency}${formatFiat(
                              Number(CusdBalance / BigInt(10 ** 18))
                            )}`
                          : isCusdBalanceLoading
                          ? 'loading'
                          : '$0,00'}
                      </FormDescription>
                      <FormDescription>
                        Recuerda que el monto ingresado es en {currentCurrency}$
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {parseInt(CusdSpendance ? formatEther(CusdSpendance) : '0') >=
                fundForm.watch('amount') ? (
                  <Button type='submit'>Fondear</Button>
                ) : (
                  <Dialog>
                    <DialogTrigger className='cursor-pointer' asChild>
                      <Button type='button'>Fondear</Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Pre-aprueba la transacción</DialogTitle>
                        <DialogDescription>
                          Para poder realizar la transacción debes tener
                          pre-aprobado un monto.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...approveForm}>
                        <form
                          onSubmit={approveForm.handleSubmit(onApproveSubmit)}
                          className='space-y-8'
                        >
                          <FormField
                            control={approveForm.control}
                            name='amount'
                            rules={{
                              required: 'Este campo es requerido',
                              min: {
                                value: 0,
                                message: 'El monto debe ser mayor a: 0',
                              },
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Valor</FormLabel>
                                <FormControl>
                                  <Input
                                    type='number'
                                    placeholder='0'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type='submit'>Fondear</Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default FundLend;
