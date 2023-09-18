'use client';
import useIsMobile from '@/hooks/useIsMobile';
import { Web3Button } from '@web3modal/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { RxTextAlignJustify } from 'react-icons/rx';
import {AnimatePresence, motion} from 'framer-motion';
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className='fixed top-0 w-full py-6 z-50 bg-white bg-opacity-90 shadow-lg'>
      <ul className='w-full flex px-10 flex-row gap-2 justify-between text-black font-bold items-center'>
        {isMobile ? (
          <>
            <RxTextAlignJustify
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-4xl font-bold transition-all ease-in-out ${
                isMenuOpen && 'rotate-90'
              }`}
            />
            <Web3Button />
          </>
        ) : (
          <>
            <li>
              <Link href={'/'}>Inicio</Link>
            </li>
            <li>
              <Link href={'/community'}>Contenido exclusivo</Link>
            </li>
            <li>
              <Link href={'http://blog.refimedellin.blog.org/'}>Blog</Link>
            </li>
            <li>
              <Web3Button />
            </li>
          </>
        )}
      </ul>
      <AnimatePresence>
      {isMenuOpen && (
          <motion.ul
          className='flex overflow-hidden flex-col gap-2 px-10 text-black font-bold items-start
          justify-center'
          initial={{ opacity: 0, height:'0px'}}
          animate={{ opacity: 1, height:'100px'}}
          exit={{ opacity:0,height:'0px'}}
           >
            <li>
              <Link href={'/'}>Inicio</Link>
            </li>
            <li>
              <Link href={'/community'}>Contenido exclusivo</Link>
            </li>
            <li>
              <Link href={'http://blog.refimedellin.blog.org/'}>Blog</Link>
            </li>
          </motion.ul>

      )}
      </AnimatePresence>

    </nav>
  );
}

export default Navbar;
