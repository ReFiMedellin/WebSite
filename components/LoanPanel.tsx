'use client'
import React, { useEffect, useState } from 'react'
import FundLend from './loanPanel/FundLend'
import RecentLends from './loanPanel/RecentLends'
import { TotalFunds } from './loanPanel/TotalFunds'
import { AdminLendPanel } from './loanPanel/AdminLendPanel'
import { AdminDashboard } from './loanPanel/AdminDashboard'

function LoanPanel ({ isAdmin }: { isAdmin: boolean }) {
  return (
    <section className='w-screen min-h-screen flex flex-col lg:p-10 gap-10'>
      <h2 className='text-2xl font-bold'>
        Bienvenido al panel de prestamos de ReFiMedellín
      </h2>
      <div className='lendPanel'>
        <TotalFunds />
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
