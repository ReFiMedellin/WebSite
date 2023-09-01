import Image from 'next/image';

// const a =
const cards = [1, 2, 3, 4, 5, 6];

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='flex flex-row justify-center items-center h-screen bg-neutral-900 w-full'>
        <div className='w-full h-full grid grid-cols-2 '>
          <div className='flex justify-center items-center w-full h-full'>
            <div className='w-5/6 flex flex-col gap-5'>
              <h1 className='text-white font-bold text-6xl'> Refi Medellín</h1>
              <p className='text-white'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
                labore ex voluptatem delectus quia, magni eum sit animi expedita
                explicabo eius ut reiciendis necessitatibus iste quaerat esse
                praesentium totam sapiente.
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
          <div className='flex justify-center items-center w-full h-full'>
            <div className='bg-amber-600 h-1/2 w-1/2' />
          </div>
        </div>
      </div>
      <div className='h-screen w-full bg-purple-400 flex flex-col justify-center items-center gap-10'>
        <h1 className='font-bold w-full text-center text-white text-5xl'>
          Proyectos
        </h1>
        <div className='grid grid-cols-2 gap-5 w-5/6 justify-center items-center'>
          {cards.map((card, index) => (
            <div
              key={index}
              className='h-40 shadow-md w-full rounded-md p-5 bg-blue-300'
            >
              Card
            </div>
          ))}
        </div>
      </div>
      <div className='h-screen grid grid-cols-2 justify-center items-center bg-black w-full'>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='bg-amber-500 w-1/2 h-1/2' />
        </div>
        <div className='text-white '>
          <div className='w-5/6 flex flex-col gap-5 h-5/6'>
            <h1 className='text-4xl font-bold'>lorem ipsum et apostel</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laudantium sunt dolor cum repudiandae corrupti consectetur aperiam
              vero eaque neque, mollitia velit voluptate error illo debitis
              ipsam fuga fugiat culpa accusamus. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Natus vero impedit incidunt
              perspiciatis quidem blanditiis cumque iure quos! Vero expedita
              facere soluta molestias deserunt iure dolorum sequi perferendis
              modi dignissimos.
            </p>
            <button className='bg-purple-700 rounded-md text-white font-bold  text-lg px-12 py-2'>
              Lorem
            </button>
          </div>
        </div>
      </div>
      <div className='h-screen grid grid-cols-2 justify-center items-center w-full'>
        <div className='w-full h-full flex justify-center items-center gap-5'>
          <div className='w-5/6 h-5/6 flex flex-col gap-5 justify-center items-start  '>
            <h1>Lorem Ipsum</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis voluptate consectetur dolorem fugit neque temporibus
              cupiditate praesentium sit omnis, consequatur at error ad cumque
              saepe expedita iusto quam dolore similique?
            </p>
            <button className='bg-purple-700 text-white rounded-md w-full font-bold px-8 py-4'>
              Lorem
            </button>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='bg-amber-600 h-1/2 w-1/2' />
        </div>
      </div>
      <footer className=' bg-slate-200 w-full '>
        <div className='flex py-60 px-14 flex-row justify-between items-center gap-20'>
          <div className='flex flex-col justify-center items-center w-1/2'>
            <h1 className='text-4xl w-full text-start font-bold'>Footer</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis qui aliquid ex voluptatibus debitis asperiores laborum
              ullam obcaecati praesentium quaerat doloribus voluptates, nobis
              nemo dolore eveniet distinctio consectetur culpa suscipit.
            </p>
          </div>
          <div className='w-1/2 text-center text-blue-500 flex flex-col gap-4'>
            <p>Some thing</p>
            <p>Some thing</p>
          </div>
        </div>
        <div className='h-[20vh] bg-purple-300 flex justify-center items-center text-center'>
            <p>®2023 Refi medellin, made with 🩵 by Refi medellín team</p>
        </div>
      </footer>
    </main>
  );
}
