'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'
import CeloLoanAbi from '@/constants/ABI/CeloLoan.json'
import { Address, parseEther } from 'viem'

import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import FundLend from './loanPanel/FundLend'
import RecentLends from './loanPanel/RecentLends'
import { TotalFunds } from './loanPanel/TotalFunds'
import { AdminLendPanel } from './loanPanel/AdminLendPanel'
import { AdminDashboard } from './loanPanel/AdminDashboard'

const contractAddress = '0x1509199009DeC9cE8f1D36f7D20412226d77E476'

function LoanPanel ({ isAdmin }: { isAdmin: boolean }) {
  return (
    <section className='w-screen min-h-screen flex flex-col p-10 gap-10'>
      <h2 className='text-2xl font-bold'>
        Bienvenido al panel de prestamos de RefiMedellín
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
