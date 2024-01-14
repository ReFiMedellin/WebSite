'use client'
import React, { useEffect } from 'react'
import FundLend from './loanPanel/FundLend'
import RecentLends from './loanPanel/RecentLends'
import { TotalFunds } from './loanPanel/TotalFunds'
import { AdminLendPanel } from './loanPanel/AdminLendPanel'
import { AdminDashboard } from './loanPanel/AdminDashboard'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

function LoanPanel ({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const network = searchParams.get('network')
  const pathName = usePathname()
  useEffect(() => {
    if (!network || (network !== 'celo' && network !== 'optimism')) {
      router.push(`${pathName}?network=celo`)
    }
  }, [network, pathName])
  return (
    <section className='w-screen min-h-screen flex flex-col lg:p-10 gap-10'>
      <h2 className='text-2xl font-bold'>
        Bienvenido al panel de prestamos de ReFiMedellín
      </h2>
      <div className='lendPanel'>
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
