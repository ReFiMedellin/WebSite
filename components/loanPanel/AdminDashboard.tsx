import React, { useState } from 'react'
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
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { ScrollArea } from '@/components/ui/scroll-area'

import { useGetLenders, useRecentLoansPerAddress } from '@/hooks'
import { Address, formatEther, zeroAddress } from 'viem'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useAggreedQuota } from '@/hooks/useAggreedQuota'
function AdminDashboard () {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)

  const { data } = useGetLenders(currentPage * 10)
  console.debug(data)
  const { data: addressData } = useRecentLoansPerAddress(
    currentAddress as Address
  )
  const { data: currentAddresData } = useAggreedQuota(currentAddress as Address)
  function getTotalTime (timeStamp: bigint) {
    const initialDate = new Date(Number(timeStamp) * 1000)
    const currentDate = new Date()

    // Calcular la diferencia en milisegundos entre las dos fechas
    const diffInMilliseconds = currentDate.getTime() - initialDate.getTime()

    // Convertir la diferencia en milisegundos a días
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))

    return diffInDays >= 0 ? diffInDays : 0
  }
  return (
    <div className='max-w-full overflow-y-scroll lg:col-span-2'>
      <Card className='w-full '>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-center'>Address</TableHead>
              <TableHead className='text-center'>Cupo Aprobado</TableHead>
              <TableHead className='text-center'>Cupo Disponible</TableHead>
              <TableHead className='text-center'>Cupo Utilizado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data ? (
              <TableRow>
                <TableCell colSpan={3}>No hay beneficiario</TableCell>
              </TableRow>
            ) : (data as any[]).length === 0 ? (
              <TableCell colSpan={3}>No hay beneficiario</TableCell>
            ) : (
              //@ts-expect-error
              data.map((lender, index) => (
                <TableRow key={index}>
                  <TableCell className='text-center'>{lender.user}</TableCell>
                  <TableCell className='text-center'>
                    {formatEther(lender.agreedQuota)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatEther(lender.currentQuota)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {lender.lendings ? (
                      <Dialog>
                        <DialogTrigger
                          className='cursor-pointer w-full'
                          asChild
                        >
                          <Button>Ver deudas</Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Deudas</DialogTitle>
                            <DialogDescription>
                              Acá podras ver todas las deudas de este usuario
                            </DialogDescription>
                          </DialogHeader>
                          {(currentAddresData as any) && (
                            <>
                              <p>
                                Cupo:{' '}
                                {formatEther((currentAddresData as any)[0])}
                                <br />
                                Saldo Actual:{' '}
                                {formatEther((currentAddresData as any)[1])}
                              </p>
                            </>
                          )}
                          <ScrollArea className='h-[200px] w-[350px] rounded-md border p-4'>
                            {lender.lendings.map(
                              (lending: any, index: number) => (
                                <>
                                  <div key={index}>
                                    <p>Deuda #{index + 1} : </p>
                                    <p>
                                      Valor inicial:{' '}
                                      {formatEther(lending.initialAmount)}
                                    </p>
                                    <p>
                                      Intereses: {formatEther(lending.interest)}
                                    </p>
                                    <p>
                                      Valor pagado:{' '}
                                      {parseFloat(formatEther(lending.amount)) -
                                        parseFloat(
                                          formatEther(lending.initialAmount)
                                        )}
                                    </p>
                                    <p>
                                      Deuda total: {formatEther(lending.amount)}
                                    </p>
                                    <p>
                                      Cantidad de meses:{' '}
                                      {Number(lending.blockMonths)}
                                    </p>
                                    <p>
                                      Dias transcurridos:{' '}
                                      {getTotalTime(lending.startDate)}
                                    </p>
                                  </div>
                                  <br />
                                </>
                              )
                            )}
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      'Sin deuda'
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>
                <Button
                  className='mr-4'
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Siguiente pagina
                </Button>
                <Button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Pagina anterior
                </Button>
              </TableCell>
              <TableCell>Pagina: {currentPage + 1}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger className='cursor-pointer w-full' asChild>
                    <Button>Buscar por dirección</Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Deudas</DialogTitle>
                      <DialogDescription>
                        Acá podras ver todas las deudas de este usuario
                      </DialogDescription>
                    </DialogHeader>
                    <Input
                      placeholder='Escribe una dirección'
                      onChange={e => setCurrentAddress(e.target.value)}
                    />
                    {(currentAddresData as any) && (
                      <>
                        <p>
                          Cupo: {formatEther((currentAddresData as any)[0])}
                          <br />
                          Saldo Actual:{' '}
                          {formatEther((currentAddresData as any)[1])}
                        </p>
                      </>
                    )}

                    {addressData ? (
                      <ScrollArea className='h-[200px] w-[350px] rounded-md border p-4'>
                        {(addressData as any[]).map(
                          (lending: any, index: number) => (
                            <>
                              <div key={index}>
                                <p>Deuda #{index + 1} : </p>
                                <p>
                                  Valor inicial:{' '}
                                  {formatEther(lending.initialAmount)}
                                </p>
                                <p>
                                  Intereses: {formatEther(lending.interest)}
                                </p>
                                <p>
                                  Valor pagado:{' '}
                                  {parseFloat(formatEther(lending.amount)) -
                                    parseFloat(
                                      formatEther(lending.initialAmount)
                                    )}
                                </p>
                                <p>
                                  Deuda total: {formatEther(lending.amount)}
                                </p>
                                <p>
                                  Cantidad de meses:{' '}
                                  {Number(lending.blockMonths)}
                                </p>
                                <p>
                                  Dias transcurridos:{' '}
                                  {getTotalTime(lending.startDate)}
                                </p>
                              </div>
                              <br />
                            </>
                          )
                        )}
                      </ScrollArea>
                    ) : (
                      <p>No hay deudas para este usuario</p>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  )
}

export { AdminDashboard }
