import Link from 'next/link'
import React from 'react'

function Header () {
  return (
    <div
      className='w-screen  overflow-hidden  bg-[#0D1C17] text-white'
    >
      <div className='animate font-bold'>
        <Link target='_blank' href='https://lu.ma/refimedellinpublic'>
          ¡Entra a nuestro Calendario Público de eventos y entérate de los
          próximos eventos, no te quedes por fuera y apoya a la comunidad
        </Link>
      </div>
    </div>
  )
}

export { Header }
