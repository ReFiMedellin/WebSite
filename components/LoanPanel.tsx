'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { erc20ABI, useAccount, useContractRead, useContractWrite } from 'wagmi'
import CeloLoanAbi from '@/constants/ABI/CeloLoan.json'
import { Address, parseEther } from 'viem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'

function LoanPanel ({ isAdmin }: { isAdmin: boolean }) {
  const [showCapitalize, setShowCapitalize] = useState(false)
  const { address } = useAccount()

  const { data: CusdBalance } = useContractRead({
    address: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as Address]
  })

  const { writeAsync: capitalize } = useContractWrite({
    address: '0x19b375F5F06B6bC556624C0Df25De01dbDCf3c6d',
    abi: CeloLoanAbi,
    functionName: 'capitalize',
    onSuccess: async txn => {
      toast({
        title: 'Capital añadido con exito',
        description: abreviarHash(txn.hash),
        action: (
          <ToastAction altText='Copy'>
            <button
              className='Button'
              onClick={async () =>
                await navigator.clipboard.writeText(txn.hash)
              }
            >
              Copy
            </button>
          </ToastAction>
        )
      })
    },
    onError: e => {
      toast({
        title: 'Error al añadir capital',
        description: e.message
      })
    }
  })
  const { writeAsync: approve } = useContractWrite({
    address: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
    abi: erc20ABI,
    functionName: 'approve'
  })
  const abreviarHash = (hash: string, longitud: number = 10): string =>
    hash.length <= longitud
      ? hash
      : `${hash.slice(0, longitud / 2)}...${hash.slice(-longitud / 2)}`

  const { writeAsync: withdraw } = useContractWrite({
    address: '0x19b375F5F06B6bC556624C0Df25De01dbDCf3c6d',
    abi: CeloLoanAbi,
    functionName: 'withdrawFunds',
    onSuccess: async txn => {
      toast({
        title: 'Fondos retirados con exito',
        description: abreviarHash(txn.hash),
        action: (
          <ToastAction altText='Copy'>
            <button
              className='Button'
              onClick={async () =>
                await navigator.clipboard.writeText(txn.hash)
              }
            >
              Copy
            </button>
          </ToastAction>
        )
      })
    },
    onError: e => {
      toast({
        title: 'Error al retirar fondos',
        description: e.message
      })
    }
  })

  const { writeAsync: loan } = useContractWrite({
    address: '0x19b375F5F06B6bC556624C0Df25De01dbDCf3c6d',
    abi: CeloLoanAbi,
    functionName: 'requestLoan',
    onSuccess: async txn => {
      toast({
        title: 'Prestamo solicitado con exito',
        description: abreviarHash(txn.hash),
        action: (
          <ToastAction altText='Copy'>
            <button
              className='Button'
              onClick={async () =>
                await navigator.clipboard.writeText(txn.hash)
              }
            >
              Copy
            </button>
          </ToastAction>
        )
      })
    },
    onError: e => {
      toast({
        title: 'Error al solicitar prestamo',
        description: e.message
      })
    }
  })

  const form = useForm()

  async function onFundSubmit (values) {
    await approve({
      args: [
        '0x19b375F5F06B6bC556624C0Df25De01dbDCf3c6d',
        parseEther(values.amount)
      ]
    })
    await capitalize({
      args: [parseEther(values.amount)]
    })
  }

  async function onLoanSubmit (values) {
    try {
      await loan({
        args: [parseEther(values.amount), values.months]
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleOnWithdraw = async () => {
    try {
      await withdraw()
    } catch (e) {
      console.error(e)
    }
  }

  const { toast } = useToast()

  return (
    <>
      <h2 className='text-2xl font-bold'>
        Bienvenido al panel de prestamos de RefiMedellín
      </h2>
      <Tabs defaultValue='Fund' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='Loan'>Prestar</TabsTrigger>
          <TabsTrigger value='Fund'>Añadir capital</TabsTrigger>
        </TabsList>
        <TabsContent value='Loan'>
          <Card>
            <CardHeader>
              <CardTitle>Pedir un prestamo</CardTitle>
              <CardDescription>
                Recuerda que para acceder a un prestamo debes pedir la
                validación
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onLoanSubmit)}
                  className='flex flex-col  items-start gap-4'
                >
                  <FormField
                    control={form.control}
                    name='amount'
                    rules={{
                      required: 'Este campo es requerido',
                      min: {
                        value: 0,
                        message: 'El monto debe ser mayor a 0'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem className='text-start  w-full'>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='100' {...field} />
                        </FormControl>
                        <FormDescription>
                          Recuerda que el monto ingresado es en Cusd
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='months'
                    rules={{
                      required: 'Este campo es requerido',
                      min: {
                        value: 0,
                        message: 'El monto debe ser mayor a 0'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem className='text-start  w-full'>
                        <FormLabel>Meses</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='6' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Pedir prestamo</Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              <CardDescription>
                Si deseas debitar un pago puedes dar click aquí
              </CardDescription>
              <Button className='w-full' onClick={handleOnWithdraw}>
                Pagar
              </Button>
            </CardFooter>
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onFundSubmit)}
                  className='flex flex-col  items-start gap-4'
                >
                  <FormField
                    control={form.control}
                    name='amount'
                    rules={{
                      required: 'Este campo es requerido',
                      min: {
                        value: 0,
                        message: 'El monto debe ser mayor a 0'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem className='text-start  w-full'>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type='number' placeholder='100' {...field} />
                        </FormControl>
                        <FormDescription>
                          {CusdBalance
                            ? `Max: ${(
                                CusdBalance / BigInt(10 ** 18)
                              ).toString()}`
                            : 'loading'}
                        </FormDescription>
                        <FormDescription>
                          Recuerda que el monto ingresado es en Cusd
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Fondear</Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              <CardDescription>
                Si deseas retirar tus fondos puedes dar click aquí
              </CardDescription>
              <Button className='w-full' onClick={handleOnWithdraw}>
                Retirar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default LoanPanel
