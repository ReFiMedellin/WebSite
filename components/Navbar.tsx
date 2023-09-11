'use client'
import { Web3Button } from '@web3modal/react'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className='fixed top-0 w-full py-6 bg-white bg-opacity-50'>
      <ul className='w-full flex px-10 flex-row gap-2 justify-between items-center' >
        <li>
          <Link href={'#'} >Blog</Link>
        </li>
        <li>
          <Link href={'/community'} >Contenido exclusivo</Link>
        </li>
        <li>
          <Web3Button />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar