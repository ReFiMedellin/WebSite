import Image from 'next/image'
import LogoMan from '@/assets/images/Logo Transparent-Man.png'
import { Dispatch, SetStateAction } from 'react'

const cardData = [
  {
    name: 'Involucrar a la comunidad local',
    description:
      'Realizar eventos que contarán con expertos en ReFi, Web3 y desafíos urbanos en ciudades latinoamericanas.',
    openModal: false,
    image: LogoMan,
    url:''
  },
  {
    name: 'Hackathones de ReFi',
    description:
      'Esperamos involucrar a jóvenes de diferentes comunidades de desarrolladores, universidades y organizaciones del sector privado interesadas en Web3 y sostenibilidad.',
    openModal: false,
    image: LogoMan,
    url:''
  },
  {
    name: 'Apoyar las innovaciones orientadas a la regeneración (ROIs) y Web3',
    description:
      'Incubar e invertir en empresas sociales que surjan de los hackathones de ReFi Medellín.',
    openModal: false,
    image: LogoMan,
    url:''
  },
  {
    name: 'Onboarding de impacto',
    description:
      'Cualquier grupo ecológico activo o grupo de amigos que desee realizar una actividad de impacto, como plantar árboles, limpiar ambientes, recolectar basura, etc., puede contactarnos y solicitar apoyo.',
    openModal: true,
    image: LogoMan,
    url:'Impact%20Onboarding/ETHRules.md'
  },
  {
    name: 'Mantener a Medellín como la Ciudad de la Eterna Primavera',
    description:
      'Actividad dedicada a plantar flores y ayudar a regenerar el insecto de las flores en Medellín, ayudando así a proteger a Medellín como Ciudad de la Eterna Primavera.',
    openModal: false,
    image: LogoMan,
    url:''
  },
  {
    name: 'Talleres de ReFi Medellín',
    description:
      'Host ReFi Medellín events. These events will include expert guest speakers in ReFi, Web3, and urban challenges in Latin American cities.',
    openModal: false,
    image: LogoMan,
    url:''
  }
]

// Iterar sobre el arreglo para generar las tarjetas
const Cards = ({fetchMD}: {fetchMD:any}) => (
  <div className='grid lg:grid-cols-2 gap-5 w-5/6 justify-center items-center'>
    {cardData.map((card, index) => (
      <div
        key={index}
        onClick={card.openModal ? ()=> {fetchMD(card.url)} : ()=> console.log('no hay url') }
        className='card relative'
      >
        <Image
          className='absolute bottom-2 right-2 lg:relative cardImage'
          src={card.image}
          alt='logo refi'
        />
        <div>
          <h3 className='text-lg font-bold'>{card.name}</h3>
          <p>{card.description}</p>
        </div>
      </div>
    ))}
  </div>
)

export default Cards
