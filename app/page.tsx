import Image from 'next/image';

// const a =

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex flex-row justify-center items-center h-screen bg-neutral-900 w-full'>
        <div className='flex flex-col justify-center items-start'>
          <h1 className='text-white font-bold'> Refi Medellín</h1>
          <p className='text-white'>
            Refi Medellín es una dao que se encarga de ...
          </p>
        </div>
      </div>
      <div className='h-screen w-full'>
        <h1>section 2</h1>
      </div>
      <div className='h-screen w-full'>
        <h1>section 3</h1>
      </div>
      <footer>
        <h1>footer</h1>
      </footer>
    </main>
  );
}
