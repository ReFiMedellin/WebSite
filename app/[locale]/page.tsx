'use client'
import Image from 'next/image'
import BordeBottom from '@/assets/images/Borde-ReFi.png'
import BordeTop from '@/assets/images/Borde Superior Sección.webp'
import LogoMan from '@/assets/images/Logo Transparent-Man.png'
import LogoWoman from '@/assets/images/Logo Transparent-Woman.png'
import Juan from '@/assets/images/PFP-Juan.webp'
import Tereza from '@/assets/images/PFP-Tereza.webp'
import Alejandro from '@/assets/images/PFP-Alejandro.webp'
import xflypeztyc from '@/assets/images/PFP-0xflypeztic.webp'
import Ximena from '@/assets/images/PFP-Ximena.webp'
import Eamon from '@/assets/images/PFP-Eamon.webp'
import Edward from '@/assets/images/PFP-Edward.webp'
import GDG from '@/assets/images/PFP-Green Digital Guardians.webp'
import Inkom from '@/assets/images/PFP-Inkom.webp'
import DotLabs from '@/assets/images/PFP-Dotlabs.webp'
import Link from 'next/link'
import LOGO from '@/assets/images/Logo Transparent-Man.png'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import { useEffect, useState } from 'react'
import { parseEther } from 'viem'
import { AnimatePresence, motion } from 'framer-motion'
import {
  RxInstagramLogo,
  RxLinkedinLogo,
  RxNotionLogo,
  RxTwitterLogo
} from 'react-icons/rx'
import { FaTelegramPlane, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { RiCloseFill } from 'react-icons/ri'
import Cards from '@/components/Cards'
import TeamMembers from '@/components/TeamMembers'
import {useTranslations} from 'next-intl';


export default function Home () {
  const t = useTranslations('Landing');
  const [value, setValue] = useState('0')
  const [isSendingModal, setIsSendingModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isModalMD, setIsModalMD] = useState(false)
  const { config, error } = usePrepareSendTransaction({
    to: '0xd4AC6c14B4C96F7e66049210F56cb07468028d4e',
    value: parseEther(value)
  })
  const [modalMD, setModalMD] = useState('')
  const { sendTransactionAsync } = useSendTransaction(config)

  const handleOnSendDonation = async (e: any) => {
    e.preventDefault()
    try {
      await sendTransactionAsync?.()
      setIsSendingModal(false)
    } catch (e) {
      console.error(e)
      setIsSendingModal(false)
    }
  }

  async function fetchMD (path: string) {
    if (path === '') {
      setIsModalMD(false)
      setShowModal(true)
      return
    }
    const owner = 'ReFiMedellin'
    const repo = '.github'

    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/vnd.github.v3.raw'
        }
      })
      // const content = Buffer.from(response.data.content, 'base64').toString('utf8');
      console.debug(response.data)
      setModalMD(response.data)
      setIsModalMD(true)
      setShowModal(true)
      // return content;
    } catch (error) {
      throw new Error(`Failed to fetch Markdown content: ${error}`)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className='fixed top-0 left-0 z-50 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center'
          >
            <motion.div className='relative bg-white rounded-lg w-[90vw] h-[80vh] flex flex-col gap-2 p-5 md:p-10 lg:w-[80vw] md:h-[60vh]'>
              <RiCloseFill
                onClick={() => setShowModal(false)}
                className='absolute md:top-4 md:right-4 top-1 right-1 font-bold text-xl cursor-pointer transition-all hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-full'
              />
              {isModalMD ?(
                <div className='overflow-y-scroll '>
                  <ReactMarkdown className='prose-sm md:prose lg:prose-xl'>
                    {modalMD}
                  </ReactMarkdown>
                </div>
              ):
                <div className='w-full h-full flex justify-center items-center'>
                  <h2 className='text-center font-bold text-xl md:text-4xl break-words'>Actualmente estamos en construcción...</h2>
                </div>
              }
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSendingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className='fixed top-0 left-0 z-20 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center'
          >
            <motion.div className='relative max-w-[90vw] z-50 bg-white p-8 rounded-lg flex flex-col gap-2 '>
              <RiCloseFill
                onClick={() => setIsSendingModal(false)}
                className='absolute top-3 right-3 font-bold text-xl cursor-pointer  hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-full'
              />
              <h3 className='text-2xl font-bold'>
                Primero ingresa el valor a donar
              </h3>
              <form
                className='flex flex-col gap-2 justify-center items-start'
                onSubmit={handleOnSendDonation}
              >
                <label className='w-full' htmlFor='amount'>
                  Cantidad en ETH
                  <input
                    className='w-full border-2 indent-2 border-purple-700 rounded-md text-black font-bold  text-lg '
                    type='number'
                    name='Cantidad en ETH'
                    id='amount'
                    value={value}
                    onChange={e => setValue(e.target.value.toString())}
                  />
                </label>
                <p className='text-sm font-light text-gray-400'>
                  Recuerda que solo se habilitara el boton si ingresas una
                  cantidad igual o menor al ETH almacenado en tu wallet
                </p>
                <button
                  className={`${
                    !sendTransactionAsync ||
                    parseFloat(value) === 0.0 ||
                    value === ''
                      ? 'bg-purple-900'
                      : 'bg-purple-700'
                  } w-full text-center  rounded-md text-white font-bold  text-lg px-12 py-2`}
                  type='submit'
                  disabled={!sendTransactionAsync || value === '0'}
                >
                  Enviar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className='flex py-20 flex-row relative first-bg justify-center items-center h-screen bg-[#1B2731] w-full'>
        <div className='h-full lg:w-5/6  flex flex-row justify-center items-center'>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='text-white w-5/6 flex flex-col gap-5'>
              <h1 className='font-bold text-4xl md:text-6xl'>
                {t('home.title')}
              </h1>
              <p className='text-base'>
                {t('home.description.part1')}{' '}
                <Link
                  className='text-blue-400 font-bold cursor-pointer'
                  href={'https://www.refidao.com/'}
                  target='_blank'
                >
                  ReFiDAO{' '}
                </Link>
                  {t('home.description.part2')}
                <br /> <br />
                  {t('home.description.part3')}
              </p>
              <div className='flex flex-row gap-2'>
                <Link
                  href={'https://t.me/refimedellin'}
                  target='_blank'
                  className='text-center px-4 py-2 w-full rounded-md bg-[#4571E1] text-white font-bold text-base md:text-lg'
                >
                  {t('home.button1')}
                </Link>
                <Link
                  href={'https://giveth.io/project/refi-medellin'}
                  target='_blank'
                  className='text-center px-4 py-2 w-full rounded-md bg-[#4571E1] text-white font-bold text-base md:text-lg'
                >
                  {t('home.button2')}
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              className='hidden lg:block w-full h-full'
              height={300}
              src={LOGO}
              alt='Medellin'
            />
          </div>
          <Image
            className='absolute bottom-0 w-[100vw] left-0'
            src={BordeBottom}
            alt='Medellin'
          />
        </div>
      </section>
      <section
        id='aboutUS'
        className='min-h-screen relative py-20 flex justify-center items-center bg-slate-900 w-full'
      >
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <Image
            className='hidden lg:block'
            src={LogoWoman}
            alt='refi logo'
            height={480}
          />
          <div className='text-white flex gap-5  flex-col justify-center items-center h-full  w-full'>
            <h2 className='text-4xl font-bold'>
              Únete al movimiento hacia un futuro más sostenible y equitativo en
              Medellín, Colombia.
            </h2>
            <p>
              ¡Bienvenido al primer Nodo Local de{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://www.refidao.com/'}
                target='_blank'
              >
                ReFiDAO{' '}
              </Link>{' '}
              en Colombia: <span className='font-bold'>ReFi Medellín</span>,
              liderado por{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://linktr.ee/juanjgiraldoc'}
                target='_blank'
              >
                Juan Giraldo
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://www.linkedin.com/in/tereza-bizkova/'}
                target='_blank'
              >
                Tereza Bizkova
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://github.com/alejandro99so'}
                target='_blank'
              >
                Alejandro Soto
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://www.linkedin.com/in/ximenamonclou/'}
                target='_blank'
              >
                Ximena Monclou
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={''}
                target='_blank'
              >
                0xflypeztic
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://twitter.com/cryptochimba'}
                target='_blank'
              >
                Eamonn
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://dgguardians.com/'}
                target='_blank'
              >
                Green Digital Guardians
              </Link>
              ,{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://inkom.io/'}
                target='_blank'
              >
                Inkom.io
              </Link>{' '}
              y{' '}
              <Link
                className='text-blue-400 font-bold cursor-pointer'
                href={'https://dotlabs.academy/'}
                target='_blank'
              >
                Dotlabs()
              </Link>
              !
              <br />
              <br />
              Nuestro objetivo es promover conversaciones comunitarias sobre
              soluciones regenerativas innovadoras habilitadas por la tecnología
              Web3.
              <br />
              <br />
              Estamos comprometidos a empoderar a los jóvenes de Medellín para
              abordar algunos de los desafíos más apremiantes que enfrenta
              nuestra ciudad, como la pobreza, la desigualdad, el desempleo
              juvenil y el acceso limitado a recursos como energía, agua,
              saneamiento, vivienda y educación.
              <br />
              <br />
              ¡Únase a nosotros en hackatones, incubación e inversión para
              ayudar a marcar la diferencia en nuestra comunidad!
            </p>
            <Link
              href={'#proyectos'}
              className='w-full text-center bg-[#4571E1] rounded-md text-white font-bold  text-lg px-12 py-2'
            >
              Conoce un poco más
            </Link>
          </div>
        </div>
      </section>
      <section className='min-h-screen py-32 relative bg-[#F1F0FF] flex justify-center items-center w-full'>
        <Image
          className='w-screen absolute top-0 '
          src={BordeTop}
          alt='borde superior'
        />
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <div className='text-black flex gap-5  flex-col justify-center items-center h-full  w-full'>
            <div className='flex gap-5 break-words  flex-col justify-center items-center h-full  w-full'>
              <h2 className='text-4xl w-full font-bold'>¡Apoya el cambio!</h2>
              <p className='break-words w-full'>
                Nuestro objetivo es promover conversaciones comunitarias sobre
                soluciones regenerativas innovadoras habilitadas por la
                tecnología Web3. Estamos comprometidos a empoderar a los jóvenes
                de Medellín para abordar algunos de los desafíos más apremiantes
                que enfrenta nuestra ciudad, como la pobreza, la desigualdad, el
                desempleo juvenil y el acceso limitado a recursos como energía,
                agua, saneamiento, vivienda y educación.
                <br />
                <br />
                ¡Únase a nosotros en hackatones, incubación e inversión para
                ayudar a marcar la diferencia en nuestra comunidad!
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
            <div className='flex z-10 flex-row w-full justify-center items-center gap-2 lg:gap-4'>
              <Link
                target='_blank'
                href={'https://giveth.io/project/refi-medellin'}
                className='text-center bg-[#4571E1] text-white rounded-md w-full font-bold  py-2 font-sm lg:px-8 lg:py-4'
              >
                Apòyanos en Giveth.io
              </Link>
              <Link
                href={'/donate?network=ethereum'}
                className='text-center bg-[#4571E1] text-white rounded-md w-full font-bold  py-2 font-sm lg:px-8 lg:py-4'
              >
                Apóyanos Directamente
              </Link>
            </div>
          </div>
          <Image
            className='hidden lg:block'
            src={LogoMan}
            alt='refi logo'
            height={480}
          />
          <Image
            className='absolute bottom-0 w-[100vw] left-0'
            src={BordeBottom}
            alt='Medellin'
          />
        </div>
      </section>
      <section
        id='proyectos'
        className='min-h-screen py-20 w-full bg-[#1B2731] flex flex-col justify-center items-center gap-10'
      >
        <h2 className='font-bold w-full text-center text-white text-5xl'>
          Proyectos
        </h2>
        <Cards fetchMD={fetchMD} />
      </section>
      <section className='min-h-screen py-32 relative flex justify-center bg-[#F1F0FF] items-center w-full'>
        <Image
          className='w-screen absolute top-0 '
          src={BordeTop}
          alt='borde superior'
        />
        <div className='flex flex-col gap-5 justify-center  items-center'>
          <h2 className='font-bold text-4xl text-black'>Equipo</h2>
          <TeamMembers />
        </div>
      </section>
      <footer className='bg-slate-200 w-full '>
        <div className='flex px-5 py-10 lg:px-14 flex-row justify-between items-center gap-20'>
          <div className='flex flex-col justify-center gap-5 items-start w-full lg:w-1/2'>
            <h2 className='text-4xl font-bold'>Más información</h2>
            <div className='w-full'>
              <p>
                Para contactarnos envianos un mensaje a{' '}
                <span className='font-bold'>admin@refimedellin.org</span>
              </p>
              <p className='break-words'>
                Si quieres apoyarnos puedes enviar tu donación a Wallet{' '}
                <span className='font-bold'>(Ethereum):</span>
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
              <Link
                className='logo'
                target='_blank'
                href={
                  'https://refimedellin.notion.site/cacd321bb2204a5888d88d3288d1bec4?v=d1871f2a1dd34bfeae1afe476e6d8b9f'
                }
              >
                <RxNotionLogo />
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
  )
}
