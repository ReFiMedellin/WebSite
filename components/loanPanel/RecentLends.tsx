import React, { useEffect, useRef, useState } from 'react'
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
import { formatEther, parseEther } from 'viem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DialogHeader } from '../ui/dialog'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApproveErc20, usePayDebt } from '@/hooks'
import { celoLoanAddress } from '@/constants'
import { useErc20Spendance } from '@/hooks/useErc20Spendance'

function RecentLends () {
  const [id, setId] = useState<string | null>(null)
  const { data: recentLends } = useRecentLends()
  const payDebtForm = useForm()
  const approveForm = useForm()

  const { writeAsync: payDebt } = usePayDebt()

  const { writeAsync: approve } = useApproveErc20()
  const { data: spendance } = useErc20Spendance()

  function getTotaDebt () {
    if (!recentLends) return 0
    let total = 0
    //@ts-expect-error
    recentLends.forEach(loan => {
      total += Number(formatEther(loan.amount))
    })
    return total
  }

  const handleOnPayDebtSubmit = async (values: any) => {
    if (
      payDebt &&
      parseFloat(spendance ? formatEther(spendance) : '0') >=
        payDebtForm.watch('value')
    ) {
      await payDebt({
        args: [id, parseEther(values.value)]
      })
      payDebtForm.reset({
        value: ''
      })
    }
  }

  async function onApproveSubmit (values: any) {
    console.debug(values.amount)
    await approve({
      args: [celoLoanAddress, parseEther(values.amount)]
    })
    approveForm.reset({
      amount: ''
    })
    payDebtForm.reset({
      value: ''
    })
  }

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
              <TableHead className='text-center'>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!recentLends ? (
              <TableRow>No hay prestamos</TableRow>
            ) : (
              //@ts-expect-error
              recentLends.map((loan, index) => (
                <TableRow key={index}>
                  <Dialog>
                    <DialogTrigger className='cursor-pointer' asChild>
                      <TableCell className='text-center'>{index}</TableCell>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px]'>
                      <DialogHeader>
                        <DialogTitle>Pagar cuota</DialogTitle>
                        <DialogDescription>
                          Ponte al día con tus pagos.
                        </DialogDescription>
                        <Form {...payDebtForm}>
                          <form
                            onSubmit={payDebtForm.handleSubmit(
                              handleOnPayDebtSubmit
                            )}
                            className='space-y-8'
                          >
                            <FormField
                              control={payDebtForm.control}
                              name='value'
                              rules={{
                                required: 'Este campo es requerido'
                                // min: {
                                //   value: formatEther(
                                //     currentLend.netAmount / currentLend.quotas
                                //   ),
                                //   message: `El monto debe ser mayor a: ${formatEther(
                                //     currentLend.netAmount / currentLend.quotas
                                //   )}`
                                // },
                                // max: {
                                //   value: formatEther(currentLend.netAmount),
                                //   message: `El monto debe ser menor a: ${formatEther(
                                //     currentLend.netAmount
                                //   )}`
                                // }
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
                            {parseFloat(
                              spendance ? formatEther(spendance) : '0'
                            ) >= payDebtForm.watch('value') ? (
                              <Button
                                onClick={() => setId(index)}
                                type='submit'
                              >
                                Pagar cuota
                              </Button>
                            ) : (
                              <Dialog>
                                <DialogTrigger
                                  className='cursor-pointer'
                                  asChild
                                >
                                  <Button type='button'>Pagar cuota</Button>
                                </DialogTrigger>
                                <DialogContent className='sm:max-w-[425px]'>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Pre-aprueba la transacción
                                    </DialogTitle>
                                    <DialogDescription>
                                      Para poder realizar la transacción debes
                                      tener pre-aprobado un monto.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <Form {...approveForm}>
                                    <form
                                      onSubmit={approveForm.handleSubmit(
                                        onApproveSubmit
                                      )}
                                      className='space-y-8'
                                    >
                                      <FormField
                                        control={approveForm.control}
                                        name='amount'
                                        rules={{
                                          required: 'Este campo es requerido',
                                          min: {
                                            value: 0,
                                            message:
                                              'El monto debe ser mayor a: 0'
                                          }
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
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <TableCell className='text-center'>
                    {formatEther(loan.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Deuda total</TableCell>
              <TableCell className='text-right'>{getTotaDebt()}$</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RecentLends
