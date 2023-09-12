'use client';
import Image from 'next/image';
import Logo from '@/assets/images/CleanLogo.png';
import Logo2 from '@/assets/images/logo2.png';
import Link from 'next/link';
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';
import { AnimatePresence, motion } from 'framer-motion';
import { RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from 'react-icons/rx';
import { FaTelegramPlane, FaWhatsapp, FaYoutube } from 'react-icons/fa';

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
  const { sendTransactionAsync } = useSendTransaction(config);

  const handleOnSendDonation = async (e: any) => {
    e.preventDefault();
    await sendTransactionAsync?.();
    setIsSendingModal(false);
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <AnimatePresence>
        {isSendingModal && (
          <motion.div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center'>
            <motion.div className='bg-white rounded-lg flex flex-col gap-2 p-2'>
              <h1>Primero ingresa el valor a donar</h1>
              <form
                className='flex flex-col gap-1 justify-center items-start'
                onSubmit={handleOnSendDonation}
              >
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
                    disabled={!sendTransactionAsync || value === '0'}
                  >
                    Enviar
                  </button>
                </label>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className='flex flex-row justify-center items-center h-[95vh] bg-neutral-900 w-full'>
        <div className='h-full lg:w-5/6 flex flex-row justify-center items-center'>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='text-white w-5/6 flex flex-col gap-5'>
              <h1 className='font-bold text-4xl md:text-6xl'>
                ¡Bienvenido a ReFi Medellín!
              </h1>
              <p className='text-base'>
                Somos el primer Nodo Colombiano de{' '}
                <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://www.refidao.com/'}
                  target='_blank'
                >
                  ReFiDAO{' '}
                </Link>
                encargado de promover proyectos ReFi en la región.
              <br /> <br />
                En ReFi Medellín, creemos en los proyectos regenerativos y el
                impacto transformador que estos tienen. ¡Es hora de pensar
                diferente y regenerarnos juntos!
              </p>
              <div className='flex flex-row gap-2'>
                <Link
                  href={'https://t.me/refimedellin'}
                  target='_blank'
                  className='text-center px-4 py-2 w-full rounded-md bg-purple-700 text-white font-bold text-base md:text-lg'
                >
                  Únete a la comunidad
                </Link>
                <Link
                  href={'https://giveth.io/project/refi-medellin'}
                  target='_blank'
                  className='text-center px-4 py-2 w-full rounded-md bg-purple-700 text-white font-bold text-base md:text-lg'
                >
                  Apóyanos en Giveth.io
                </Link>
              </div>
            </div>
          </div>
          <Image
            className='hidden lg:block'
            height={420}
            src={Logo}
            alt='Logo ReFi'
          />
        </div>
      </section>
      <section className='min-h-screen py-10 lg:py-0 flex justify-center items-center bg-black w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <Image
            className='hidden lg:block'
            src={Logo}
            alt='refi logo'
            height={480}
          />
          <div className='text-white flex gap-5  flex-col justify-center items-center h-full  w-full'>
            <h1 className='text-4xl font-bold'>
              Únete al movimiento hacia un futuro más sostenible y equitativo en
              Medellín, Colombia.
            </h1>
            <p>
              ¡Bienvenido al primer Nodo Local de{' '}
                <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://www.refidao.com/'}
                  target='_blank'
                >
                  ReFiDAO{' '}
                </Link> en Colombia:  <span className='font-bold'>ReFi Medellín</span>, liderado por {' '}
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://linktr.ee/juanjgiraldoc'}
                  target='_blank'
                >
                  Juan Giraldo
                </Link>,{' '}
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://www.linkedin.com/in/tereza-bizkova/'}
                  target='_blank'
                >
                  Tereza Bizkova
                </Link>,{' '}
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://github.com/alejandro99so'}
                  target='_blank'
                >
                  Alejandro Soto
                </Link>,{' '}
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://www.linkedin.com/in/ximenamonclou/'}
                  target='_blank'
                >
                  Ximena Monclou
                </Link>,{' '}
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={''}
                  target='_blank'
                >
                  0xflypeztic
                </Link>,{' '}
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://twitter.com/cryptochimba'}
                  target='_blank'
                >
                  Eamonn
                </Link>,{' '} 
              <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://dgguardians.com/'}
                  target='_blank'
                >
                  Green Digital Guardians
                </Link>,{' '}
                  <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://inkom.io/'}
                  target='_blank'
                >
                  Inkom.io
                </Link> y{' '}
               <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://dotlabs.academy/'}
                  target='_blank'
                >
                  Dotlabs()
                </Link>!
            <br />
            <br />
              Nuestro objetivo es promover conversaciones
              comunitarias sobre soluciones regenerativas innovadoras
              habilitadas por la tecnología Web3. 
          <br /><br />
              Estamos comprometidos a
              empoderar a los jóvenes de Medellín para abordar algunos de los
              desafíos más apremiantes que enfrenta nuestra ciudad, como la
              pobreza, la desigualdad, el desempleo juvenil y el acceso limitado
              a recursos como energía, agua, saneamiento, vivienda y educación.
           <br /><br />
            ¡Únase a nosotros en hackatones, incubación e inversión para
              ayudar a marcar la diferencia en nuestra comunidad!
            </p>
            <Link
              href={'#proyectos'}
              className='w-full text-center bg-purple-700 rounded-md text-white font-bold  text-lg px-12 py-2'
            >
              Conoce un poco más
            </Link>
          </div>
        </div>
      </section>
      <section
        id='proyectos'
        className='min-h-screen py-10 lg:py-0 w-full bg-purple-700 flex flex-col justify-center items-center gap-10'
      >
        <h1 className='font-bold w-full text-center text-white text-5xl'>
          Proyectos
        </h1>
        <div className='grid lg:grid-cols-2 gap-5 w-5/6 justify-center items-center'>
          {cards.map((card, index) => (
            <div
              key={index}
              className='py-6 flex flex-row gap-2 justify-center items-center shadow-md w-full rounded-md p-5 text-black bg-white'
            >
              <Image
                className='hidden lg:block'
                src={Logo2}
                alt='logo refi'
                height={120}
              />
              <div>
                <h1 className='text-lg font-bold'>
                  Involucrar a la comunidad local
                </h1>
                <p>
                  Realizar eventos que contarán con expertos en ReFi, Web3 y desafíos urbanos en ciudades latinoamericanas
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='min-h-screen py-10 lg:py-0 flex justify-center items-center w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <div className='text-black flex gap-5  flex-col justify-center items-center h-full  w-full'>
            <div className='w-full'>
              <h1 className='text-4xl font-bold'>¡Apoya el cambio!</h1>
              <p className='break-words'>
                Nuestro objetivo es promover conversaciones comunitarias sobre
                soluciones regenerativas innovadoras habilitadas por la
                tecnología Web3. Estamos comprometidos a empoderar a los jóvenes
                de Medellín para abordar algunos de los desafíos más apremiantes
                que enfrenta nuestra ciudad, como la pobreza, la desigualdad, el
                desempleo juvenil y el acceso limitado a recursos como energía,
                agua, saneamiento, vivienda y educación. 
                <br />
                <br />
                ¡Únase a nosotros en hackatones, incubación e inversión para ayudar a marcar la
                diferencia en nuestra comunidad!
                <br />
                <br />
                Les pedimos amablemente su apoyo y donaciones para que podamos
                iniciar nuestro viaje de la ¡educación dirigida por jóvenes para
                la regeneración!
                <br />
                <br />
                <span className='font-bold'>Wallet (Ethereum):</span>
                0xd4AC6c14B4C96F7e66049210F56cb07468028d4e
              </p>
            </div>
            <div className='flex flex-row w-full justify-center items-center gap-2 lg:gap-4'>
              <Link
                target='_blank'
                href={'https://giveth.io/project/refi-medellin'}
                className='text-center bg-purple-700 text-white rounded-md w-full font-bold  py-2 font-sm lg:px-8 lg:py-4'
              >
                Apòyanos en Giveth.io
              </Link>
              <button
                onClick={() => setIsSendingModal(true)}
                className='bg-purple-700 text-white rounded-md w-full font-bold  py-2 font-sm lg:px-8 lg:py-4'
              >
                Apóyanos Directamente
              </button>
            </div>
          </div>
          <Image
            className='hidden lg:block'
            src={Logo2}
            alt='refi logo'
            height={480}
          />
        </div>
      </section>
      <section className='min-h-screen py-10 lg:py-0 flex justify-center bg-slate-300 items-center w-full'>
        <div className='flex flex-col gap-5 justify-center  items-center'>
          <h1 className='font-bold text-4xl text-black'>Equipo</h1>
          <div className='flex-row flex flex-wrap justify-center items-center gap-5'>
            <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Juan Giraldo</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Founder</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
            <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Tereza Bizkova</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Co-Founder</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
            <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Alejandro Soto</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Co-Founder</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
            <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Ximena Monclou</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Legal</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
            <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >0xflypeztyc</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Branding & Social</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
             <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Eamon</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Co-Founder</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
             <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Green Digital Guardians</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Partner</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
             <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >Inko.io</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Treasury</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
             <div className='h-full pt-5 rounded-md shadow-lg flex flex-col gap-2 bg-slate-200'>
              <div className='px-5 text-center'>
                <h1 className='text-start w-full font-bold text-lg' >DotLabs()</h1>
                <p className='w-full text-start font-light text-sm text-slate-700'>Educational Partner</p>
              </div>
              <div className='w-64 h-80 px-5 rounded-md bg-neutral-200' />
            </div>
          </div>
        </div>
      </section>
      <footer className='bg-slate-200 w-full '>
        <div className='flex px-5 py-10 lg:px-14 flex-row justify-between items-center gap-20'>
          <div className='flex flex-col justify-center gap-5 items-start w-full lg:w-1/2'>
            <h1 className='text-4xl font-bold'>Más información</h1>
            <div className='w-full'>
            <p>
              Para contactarnos envianos un mensaje a{' '}
              <span className='font-bold'>admin@refimedellin.org</span>
            </p>
            <p className='break-words' >
              Si quieres apoyarnos puedes enviar tu donación a la Wallet{' '}
              <br />
              <span className='font-bold'>(EVM Compatible):</span>{' '}
              0xd4AC6c14B4C96F7e66049210F56cb07468028d4e
            </p>
            </div>
            <div className='flex flex-row flex-wrap justify-start items-center gap-5'>
              <Link
                className='logo'
                target='_blank'
                href={'https://twitter.com/ReFiMedellin'}
              >
                <RxTwitterLogo />
              </Link>
              <Link
                className='logo'
                target='_blank'
                href={'https://instagram.com/refimedellin'}
              >
                <RxInstagramLogo />
              </Link>
              <Link
                className='logo'
                target='_blank'
                href={'https://t.me/refimedellin'}
              >
                <FaTelegramPlane />
              </Link>
              <Link
                className='logo'
                target='_blank'
                href={'https://www.linkedin.com/company/refimedellin'}
              >
                <RxLinkedinLogo />
              </Link>

              <Link
                className='logo'
                target='_blank'
                href={'https://youtube.com/@ReFiMedellin'}
              >
                <FaYoutube />
              </Link>

              <Link
                className='logo'
                target='_blank'
                href={'https://chat.whatsapp.com/C2dUH2dmZyTJdLjWkE1ILG'}
              >
                <FaWhatsapp />
              </Link>
            </div>
          </div>
        </div>
        <div className='py-5 bg-gray-700 text-white  px-2 flex flex-col gap-1 justify-center items-center text-center'>
          <p>
            ®2023 Refi Medellín, made with 🩵 by{' '}
            <Link
              className='text-blue-400 font-bold cursor-pointer'
              href={
                'https://refimedellin.notion.site/0fd39ac0a6cf4ee8bfe3d950c18bc9ed?v=d9dafe69cda7413a8d85cac3da405c40'
              }
              target='_blank'
            >
              Refi Medellín Team{' '}
            </Link>
          </p>
          <Link target='_blank' href={'https://github.com/Another-DevX'}>
            Developed by{' '}
            <span className='text-blue-400 font-bold'>Another_Dev</span>
          </Link>
        </div>
      </footer> 
    </main>
  );
}
