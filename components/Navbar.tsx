'use client'
import { Web3Button } from '@web3modal/react'
import React from 'react'

function Navbar() {
  return (
    <nav className='fixed top-0 w-full py-6 bg-white bg-opacity-50'>
      <ul>
        <li>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <Web3Button />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar