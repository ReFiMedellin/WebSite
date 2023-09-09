'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import Logo2 from '@/assets/images/logo2.png';
import Link from 'next/link';
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { AnimatePresence, motion } from 'framer-motion';

// const a =
const cards = [1, 2, 3, 4, 5, 6];

export default function Home() {
  const { open, close } = useWeb3Modal();
  const [value, setValue] = useState('0');
  const [isSendingModal, setIsSendingModal] = useState(false);
  const { config, error } = usePrepareSendTransaction({
    to: '0xd4AC6c14B4C96F7e66049210F56cb07468028d4e',
    value: parseEther(value),
  });
  const { sendTransaction } = useSendTransaction(config);
  useEffect(() => {
    console.debug(sendTransaction);
  }, [sendTransaction]);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <AnimatePresence>
        {isSendingModal && (
          <motion.div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center'>
            <motion.div className='bg-white rounded-lg flex flex-col gap-2 p-2'>
              <h1>Primero ingresa el valor a donar</h1>
              <form action=''>
                <label htmlFor='Cantidad en ETH'>
                  <input
                    type='number'
                    name='Cantidad en ETH'
                    id='Cantidad en ETH'
                    value={value}
                    onChange={(e) => setValue(e.target.value.toString())}
                  />
                  <button
                    type='submit'
                    disabled={!sendTransaction || value === '0'}
                  >
                    Enviar
                  </button>
                </label>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex flex-row justify-center items-center h-screen bg-neutral-900 w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center items-center'>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='text-white w-5/6 flex flex-col gap-5'>
              <h1 className='font-bold text-6xl'>
                ¡Bienvenido a ReFi Medellín!
              </h1>
              <p>
                El primer Nodo colombiano de{' '}
                <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://www.refidao.com/'}
                  target='_blank'
                >
                  ReFi DAO{' '}
                </Link>
                encargado de promover proyectos ReFi de la región.
              </p>
              <p>
                En ReFi Medellín, creemos en los proyectos regenerativos y el
                impacto transformador que estos tienen. ¡Es hora de pensar
                diferente y regenerarnos juntos!
              </p>
              <div className='flex flex-row gap-2'>
                <Link
                  href={'https://t.me/refimedellin'}
                  target='_blank'
                  className='text-center px-4 py-2 w-full rounded-md bg-purple-700 text-white font-bold text-lg'
                >
                  Únete a la comunidad
                </Link>
                <Link
                  href={'https://giveth.io/project/refi-medellin'}
                  target='_blank'
                  className='text-center px-4 py-2 w-full rounded-md bg-purple-700 text-white font-bold text-lg'
                >
                  Apoyanos en Giveth
                </Link>
              </div>
            </div>
          </div>
          <Image height={420} src={Logo} alt='Logo ReFi' />
        </div>
      </div>
      <section className='h-screen flex justify-center items-center bg-black w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <Image src={Logo} alt='refi logo' height={480} />
          <div className='text-white flex gap-5  flex-col justify-center items-center h-full  w-full'>
            <h1 className='text-4xl font-bold'>
              Únete al movimiento hacia un futuro más sostenible y equitativo en
              Medellín, Colombia.
            </h1>
            <p>
              Estamos emocionados de anunciar la formación de un Nodo Local de
              ReFi en Medellín, liderado por Juan Giraldo, Tereza Bizkova,
              Alejandro Soto, Eamonn, Sergio, Green Digital Guardians y
              Dotlabs() para fomentar conversaciones comunitarias en torno a
              innovaciones orientadas a la regeneración (ROIs) habilitadas por
              Web3. Nuestro objetivo es empoderar a los jóvenes en Medellín para
              abordar algunos de los desafíos más urgentes de nuestra ciudad a
              través de hackatones, incubación e inversión. Estos desafíos
              incluyen la pobreza, la desigualdad, el desempleo juvenil y una
              falta general de acceso a flujos de recursos como energía, agua,
              saneamiento, vivienda y educación.
            </p>
            <Link
              href={'#proyectos'}
              className='w-full text-center bg-purple-700 rounded-md text-white font-bold  text-lg px-12 py-2'
            >
              Sabe más
            </Link>
          </div>
        </div>
      </section>
      <section
        id='proyectos'
        className='h-screen w-full bg-purple-700 flex flex-col justify-center items-center gap-10'
      >
        <h1 className='font-bold w-full text-center text-white text-5xl'>
          Proyectos
        </h1>
        <div className='grid grid-cols-2 gap-5 w-5/6 justify-center items-center'>
          {cards.map((card, index) => (
            <div
              key={index}
              className='py-6 flex flex-row gap-2 justify-center items-center shadow-md w-full rounded-md p-5 bg-white'
            >
              <Image src={Logo2} alt='logo refi' height={120} />
              <div>
                <h1 className='text-lg font-bold'>
                  Engage the local community
                </h1>
                <p>
                  Host four ReFi Medellín events over the next year. These
                  events will include expert guest speakers in ReFi, Web3, and
                  urban challenges in Latin American cities.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='h-screen flex justify-center items-center w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-4xl font-bold'>¡Apoya el cambio!</h1>
            <p>
              Our aim is to empower the youth in Medellín to address some of our
              city&apos;s most pressing challenges through hackathons,
              incubation, and investment. These challenges include poverty,
              inequality, youth unemployment, and a general lack of access to
              resource flows such as energy, water, sanitation, housing, and
              education.
              <br />
              We kindly ask for your support and donations, so we can start our
              journey of youth-led education for regeneration!
              <br />
              Wallet (Ethereum): 0xd4AC6c14B4C96F7e66049210F56cb07468028d4e
            </p>
            <div className='flex flex-row w-full justify-center items-center gap-4'>
              <Link
                target='_blank'
                href={'https://giveth.io/project/refi-medellin'}
                className='text-center bg-purple-700 text-white rounded-md w-full font-bold px-8 py-4'
              >
                Apoyanos en givet
              </Link>
              <button
                onClick={() => setIsSendingModal(true)}
                className='bg-purple-700 text-white rounded-md w-full font-bold px-8 py-4'
              >
                Apoyanos directamente
              </button>
            </div>
          </div>
          <Image src={Logo2} alt='refi logo' height={480} />
        </div>
      </section>
      <footer className=' bg-slate-200 w-full '>
        <div className='flex py-60 px-14 flex-row justify-between items-center gap-20'>
          <div className='flex flex-col justify-center items-center w-1/2'>
            <h1 className='text-4xl w-full text-start font-bold'>Contacto</h1>
          </div>
        </div>
        <div className='h-[20vh] bg-gray-700 text-white  flex justify-center items-center text-center'>
          <p>®2023 Refi medellin, made with 🩵 by Refi medellín team</p>
        </div>
      </footer>
    </main>
  );
}
