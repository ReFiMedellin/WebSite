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
import { NetworkModal } from './loanPanel/NetworkModal'
import { toast } from './ui/use-toast'

const Chains = {
  celo: 42220,
  optimism: 10
}

function LoanPanel ({ isAdmin }: { isAdmin: boolean }) {
  const [selectedChain, setSelectedChain] = useState<
    keyof typeof Chains | null
  >(null)
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const { chain } = useNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()

  useEffect(() => {
    const currentChain =
      chain?.id === Chains.celo
        ? 'celo'
        : chain?.id === Chains.optimism
        ? 'optimism'
        : null
    setSelectedChain(currentChain)

    if (chain?.id !== Chains.celo && chain?.id !== Chains.optimism) {
      setShowNetworkModal(true)
    } else {
      setShowNetworkModal(false)
    }
  }, [chain])

  const handleNetworkChange = async (value: keyof typeof Chains) => {
    const desiredChainId = Chains[value]
    toast({
      title: 'Tip',
      description: 'Recuerda aceptar el cambio de red en tu billetera'
    })
    await switchNetworkAsync?.(desiredChainId)

    const checkIfNetworkChanged = () => {
      if (chain?.id !== desiredChainId) {
        setTimeout(checkIfNetworkChanged, 1000)
      } else {
        setSelectedChain(value)
      }
    }

    checkIfNetworkChanged()
  }

  if (showNetworkModal) {
    return <NetworkModal onNetworkSelect={handleNetworkChange} />
  }
  return (
    <section className='w-screen min-h-screen flex flex-col lg:p-10 gap-10'>
      <h2 className='text-2xl font-bold'>
        Bienvenido al panel de prestamos de ReFiMedellín
      </h2>
      <div className='lendPanel'>
        <div className='flex flex-col gap-2 place-self-start'>
          <h4>Selecciona la red</h4>
          <Select
            key={selectedChain}
            defaultValue={selectedChain as string}
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
    </section>
  )
}

export default LoanPanel
