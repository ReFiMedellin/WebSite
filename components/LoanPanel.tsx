'use client'
import React, { useEffect, useState } from 'react'
import FundLend from './loanPanel/FundLend'
import RecentLends from './loanPanel/RecentLends'
import { TotalFunds } from './loanPanel/TotalFunds'
import { AdminLendPanel } from './loanPanel/AdminLendPanel'
import { AdminDashboard } from './loanPanel/AdminDashboard'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { capitalize } from '@/functions/capitalize'

const Chains = {
  celo: 42220,
  optimism: 10
}

function LoanPanel ({ isAdmin }: { isAdmin: boolean }) {
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  const router = useRouter()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const pathName = usePathname()

  const searchParams = new URLSearchParams(window.location.search)
  const networkQueryParam = searchParams.get('network')

  useEffect(() => {
    if (
      !networkQueryParam ||
      (networkQueryParam !== 'celo' && networkQueryParam !== 'optimism')
    ) {
      router.push(`?network=celo`)
    } else if (networkQueryParam === 'celo' && chain?.id !== Chains.celo) {
      switchNetwork?.(Chains.celo)
    } else if (
      networkQueryParam === 'optimism' &&
      chain?.id !== Chains.optimism
    ) {
      switchNetwork?.(Chains.optimism)
    } else {
      setIsCorrectNetwork(true)
    }
  }, [networkQueryParam, chain, switchNetwork, router])

  const handleNetworkChange = (value: string) => {
    console.debug('handleNetworkChange', value)
    switchNetwork?.(Chains[value as keyof typeof Chains])
    router.push(`${pathName}?network=${value}`)
  }
  return (
    <section className='w-screen min-h-screen flex flex-col lg:p-10 gap-10'>
      <h2 className='text-2xl font-bold'>
        Bienvenido al panel de prestamos de ReFiMedellín
      </h2>
      {isCorrectNetwork ? (
        <div className='lendPanel'>
          <div className='flex flex-col gap-2 place-self-start'>
            <h4>Selecciona la red</h4>
            <Select
              defaultValue={networkQueryParam as string}
              onValueChange={handleNetworkChange}
            >
              <SelectTrigger>
                <SelectValue placeholder='Red' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='celo'>Celo</SelectItem>
                <SelectItem value='optimism'>Optimism</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TotalFunds isAdmin={isAdmin} />
          <FundLend />
          <RecentLends />
          {isAdmin && (
            <>
              <AdminLendPanel />
              <AdminDashboard />
            </>
          )}
        </div>
      ) : (
        <h2>
          Debes cambiar la red de tu billetera a{' '}
          {capitalize(networkQueryParam as string)}
        </h2>
      )}
    </section>
  )
}

export default LoanPanel
