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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { isAddress, parseEther } from 'viem'
import { useGetLenders, useManageQuota, useManageWhitelist } from '@/hooks'

function AdminLendPanel () {
  const [currentPage, setCurrentPage] = useState(0)

  const { incrementQuota, decrementQuota } = useManageQuota()
  const { addToWhiteList, removeFromWhiteList } = useManageWhitelist()

  const increaseQuotaForm = useForm()
  const decreaseQuotaForm = useForm()
  const addToWhiteListForm = useForm()
  const removeToWhiteListForm = useForm()

  const onIncreaseSubmit = async (values: any) => {
    try {
      await incrementQuota.writeAsync({
        args: [values.Address, parseEther(values.amount)]
      })
      increaseQuotaForm.reset({
        Address: '',
        amount: ''
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onDecreaseSubmit = async (values: any) => {
    try {
      await decrementQuota.writeAsync({
        args: [values.Address, parseEther(values.amount)]
      })
      decreaseQuotaForm.reset({
        Address: '',
        amount: ''
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onAddToWhiteListSubmit = async (values: any) => {
    try {
      await addToWhiteList.writeAsync({
        args: [values.Address, parseEther(values.Amount)]
      })
      addToWhiteListForm.reset({
        Address: '',
        Amount: ''
      })
    } catch (e) {
      console.error(e)
    }
  }
  const onRemoveFromWhiteList = async (values: any) => {
    try {
      await removeFromWhiteList.writeAsync({
        args: [values.Address]
      })
      removeToWhiteListForm.reset({
        Address: ''
      })
    } catch (e) {
      console.error(e)
    }
  }

  function isValidEthereumAddress (address: string) {
    return isAddress(address)
  }

  return (
    <div className='lg:col-span-2 flex w-full flex-col lg:flex-row justify-stretch items-stretch gap-10 '>
      <Card className='w-full recent '>
        <CardHeader>
          <CardTitle>Modificar lista blanca</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='add' className='fundLend'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='add'>Añadir</TabsTrigger>
              <TabsTrigger value='remove'>Remover</TabsTrigger>
            </TabsList>
            <TabsContent value='add'>
              <Card>
                <CardHeader>
                  <CardTitle>Añadir a lista blanca</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...addToWhiteListForm}>
                    <form
                      onSubmit={addToWhiteListForm.handleSubmit(
                        onAddToWhiteListSubmit
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={addToWhiteListForm.control}
                        name='Address'
                        rules={{
                          required: 'Este campo es requerido',
                          validate: {
                            isValidEthereumAddress: value =>
                              isValidEthereumAddress(value) ||
                              'Debe ser una dirección válida de Ethereum'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addToWhiteListForm.control}
                        name='Amount'
                        rules={{
                          required: 'Este campo es requerido',
                          min: {
                            value: 0,
                            message: 'El cupo debe ser mayor a 0'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Cupo inicial</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='1000'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Recuerda que todos los valores son dados en Cusd
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Añadir a whitelist</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='remove'>
              <Card>
                <CardHeader>
                  <CardTitle>Remover de la lista blanca</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...removeToWhiteListForm}>
                    <form
                      onSubmit={removeToWhiteListForm.handleSubmit(
                        onRemoveFromWhiteList
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={removeToWhiteListForm.control}
                        name='Address'
                        rules={{
                          required: 'Este campo es requerido',
                          validate: {
                            isValidEthereumAddress: value =>
                              isValidEthereumAddress(value) ||
                              'Debe ser una dirección válida de Ethereum'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Añadir a whitelist</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className='w-full recent'>
        <CardHeader>
          <CardTitle>Modificar cupo de usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='increase' className='fundLend'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='increase'>Aumentar</TabsTrigger>
              <TabsTrigger value='decrease'>Disminuir</TabsTrigger>
            </TabsList>
            <TabsContent value='increase'>
              <Card>
                <CardHeader>
                  <CardTitle>Aumentar cupo</CardTitle>
                  <CardDescription>
                    Recuerda que primero debes añadir a la whitelist al usuario
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...increaseQuotaForm}>
                    <form
                      onSubmit={increaseQuotaForm.handleSubmit(
                        onIncreaseSubmit
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={increaseQuotaForm.control}
                        name='amount'
                        rules={{
                          required: 'Este campo es requerido'
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='100'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Recuerda que el monto ingresado es en Cusd
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={increaseQuotaForm.control}
                        name='Address'
                        rules={{
                          required: 'Este campo es requerido',
                          validate: {
                            isValidEthereumAddress: value =>
                              isValidEthereumAddress(value) ||
                              'Debe ser una dirección válida de Ethereum'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Aumentar cupo</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='decrease'>
              <Card>
                <CardHeader>
                  <CardTitle>Disminuir cupo</CardTitle>
                  <CardDescription>
                    Recuerda que primero debes añadir a la whitelist al usuario
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <Form {...decreaseQuotaForm}>
                    <form
                      onSubmit={decreaseQuotaForm.handleSubmit(
                        onDecreaseSubmit
                      )}
                      className='flex flex-col  items-start gap-4'
                    >
                      <FormField
                        control={decreaseQuotaForm.control}
                        name='amount'
                        rules={{
                          required: 'Este campo es requerido'
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='100'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Recuerda que el monto ingresado es en Cusd
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={decreaseQuotaForm.control}
                        name='Address'
                        rules={{
                          required: 'Este campo es requerido',
                          validate: {
                            isValidEthereumAddress: value =>
                              isValidEthereumAddress(value) ||
                              'Debe ser una dirección válida de Ethereum'
                          }
                        }}
                        render={({ field }) => (
                          <FormItem className='text-start  w-full'>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='0xd7sjh27shs68...'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>Disminuir cupo</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export { AdminLendPanel }
