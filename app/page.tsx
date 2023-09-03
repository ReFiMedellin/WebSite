import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import Logo2 from '@/assets/images/logo2.png';
import Link from 'next/link';

// const a =
const cards = [1, 2, 3, 4, 5, 6];

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex flex-row justify-center items-center h-screen bg-neutral-900 w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center items-center'>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='text-white w-5/6 flex flex-col gap-5'>
              <h1 className='font-bold text-6xl'>
                ¡Bienvenido a ReFi Medellín!
              </h1>
              <p>
                El primer Nodo colombiano de ReFi DAO encargado de promover
                proyectos ReFi de la región.
              </p>
              <p>
                En ReFi Medellín, creemos en los proyectos regenerativos y el
                impacto transformador que estos tienen. ¡Es hora de pensar
                diferente y regenerarnos juntos!
              </p>
              <div className='flex flex-row gap-2'>
                <button className='px-4 py-2 w-full rounded-md bg-purple-700 text-white font-bold text-lg'>
                  Lorem
                </button>
                <button className='px-4 py-2 w-full rounded-md bg-purple-700 text-white font-bold text-lg'>
                  Ipsum
                </button>
              </div>
            </div>
          </div>
          <Image height={420} src={Logo} alt='Logo Refi' />
        </div>
      </div>
      <div className='h-screen w-full bg-purple-700 flex flex-col justify-center items-center gap-10'>
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
      </div>
      <div className='h-screen flex justify-center items-center bg-black w-full'>
        <div className='h-full w-5/6 flex flex-row justify-center gap-10 items-center'>
          <Image src={Logo} alt='refi logo' height={480} />
          <div className='text-white flex gap-5  flex-col justify-center items-center h-full  w-full'>
              <h1 className='text-4xl font-bold'>
                ReFi Medellín Join the movement towards a more sustainable and
                equitable future in Medellín, Colombia
              </h1>
              <p>
                We are excited to announce the formation of a ReFi Local Node in
                Medellín, led by Juan Giraldo, Tereza Bizkova, Alejandro Soto,
                Eamonn, Sergio, Green Digital guardians and Dotlabs() to nurture
                community conversations around Web3 enabled
                <br />
                regenerative-oriented-innovations (ROIs). Our aim is to empower
                the youth in Medellín to address some of our city&apos;s most
                pressing challenges through hackathons, incubation, and
                investment. These challenges include poverty, inequality, youth
                unemployment, and a general lack of access to resource flows
                such as energy, water, sanitation, housing, and education.
              </p>
              <button className='w-full bg-purple-700 rounded-md text-white font-bold  text-lg px-12 py-2'>
                Conocenos
              </button>
          </div>
        </div>
      </div>
      <div className='h-screen flex justify-center items-center w-full'>
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
            <button className='bg-purple-700 text-white rounded-md w-full font-bold px-8 py-4'>
              Apoyar
            </button>
          </div>
        <Image src={Logo2} alt='refi logo' height={480} />
        </div>
      </div>
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
