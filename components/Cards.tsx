import Image from 'next/image'
import LogoMan from '@/assets/images/Logo Transparent-Man.png'
import { Dispatch, SetStateAction } from 'react'
import { useTranslations } from 'next-intl'

// Iterar sobre el arreglo para generar las tarjetas
const Cards = ({ fetchMD }: { fetchMD: any }) => {
  const t = useTranslations('Cards')
  const cardData = [
    {
      openModal: true,
      image: LogoMan,
      url: ''
    },
    {
      openModal: true,
      image: LogoMan,
      url: ''
    },
    {
      openModal: true,
      image: LogoMan,
      url: ''
    },
    {
      openModal: true,
      image: LogoMan,
      url: 'Impact%20Onboarding/ETHRules.md'
    },
    {
      openModal: true,
      image: LogoMan,
      url: ''
    },
    {
      openModal: true,
      image: LogoMan,
      url: ''
    }
  ]

  return (
    <div className='grid lg:grid-cols-2 gap-5 w-5/6 justify-center items-center'>
      {cardData.map((card, index) => (
        <div
          key={index}
          onClick={
            card.openModal
              ? () => {
                  fetchMD(card.url)
                }
              : () => console.log('no hay url')
          }
          className='card relative'
        >
          <Image
            className='absolute bottom-2 right-2 lg:relative cardImage'
            src={card.image}
            alt='logo refi'
          />
          <div>
            <h3 className='text-lg font-bold'>{t(`${index+1}.name`)}</h3>
            <p>{t(`${index + 1}.description`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
