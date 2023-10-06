'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '@/components/Modal'
import {
  Address,
  useAccount,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction
} from 'wagmi'
import { useNativeTxn, useTxn, useUSDValue } from '@/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { zeroAddress } from 'viem'
import ChainLinkContracts from '@/constants/chainLinkContracts'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import errorIcon from '@/assets/icons/exclamation.png'
import checkIcon from '@/assets/icons/check-circle.png'
import BordeBottom from '@/assets/images/Borde-ReFi.png'
import { useTranslations } from 'next-intl'

type donationData = {
  token: Address
  oracle: Address
  amount?: number
  chain?: availableChains
}

type availableChains =
  | 'Ethereum'
  | 'Polygon'
  | 'OP Mainnet'
  | 'Arbitrum One'
  | 'Celo'

type Params = {
  network: availableChains | null
}

type Token = {
  name: string
  contract: Address
  oracle: string
}

function Page () {
  const t = useTranslations('Donate')
  const params = useSearchParams()
  const searchParams: Params = useMemo(
    () => ({ network: params.get('network') as availableChains }),
    [params]
  )

  const router = useRouter()

  const chainIds = {
    ethereum: 1,
    polygon: 137,
    celo: 42220,
    Alfajores: 44787,
    optimism: 10,
    arbitrum: 42161
  }
  const [isMounted, setIsMounted] = useState(false)
  const { isConnected, address } = useAccount()
  const [data, setData] = useState<null | donationData>(null)
  const [networkValue, setNetworkValue] = useState('ethereum')
  const [price, setPrice] = useState<string>('0')
  const [isSendingTXN, setisSendingTXN] = useState(false)
  const { data: currentPricing, setAddress } = useUSDValue()
  const [triggerTxn, setTriggerTxn] = useState<boolean>(false)
  const priceRef = useRef<HTMLInputElement>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<string>('')
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true)
  const [isCorrectAmmount, setIsCorrectAmmount] = useState<any>({
    onlyAmmount: true,
    submit: false
  })
  const [Tokens, setTokens] = useState<Token[]>([
    {
      name: 'USDC',
      contract: zeroAddress,
      oracle: zeroAddress
    },
    {
      name: 'USDT',
      contract: zeroAddress,
      oracle: zeroAddress
    }
  ])
  const [hash, setHash] = useState<string>()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const {
    data: awaitTxn,
    isError: awaitTxnError,
    isLoading: awaitTxnLoading
  } = useWaitForTransaction({
    hash: hash as Address | undefined,
    onSuccess (data) {
      console.debug('Success', data)
    }
  })

  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const [isChangingNetwork, setIsChangingNetwork] = useState<boolean>(false)
  const {
    txnData: txnNativeData,
    txnLoading: txnNativeLoading,
    txnSuccess: txnNativeSuccess,
    txnError: txnNativeError,
    txnErrorData: txnNativeErrorData,
    sendTransaction: sendNativeTransaction
  } = useNativeTxn(data?.amount as number, data?.chain as availableChains)
  const {
    txnData,
    txnLoading,
    txnSuccess,
    txnError,
    txnErrorData,
    sendTransaction,
    decimalSuccess,
    decimalsLoading
  } = useTxn(
    data?.token as Address,
    data?.amount as number,
    data?.chain as availableChains
  )

  useEffect(() => {
    setAddress(data?.oracle as Address)
  }, [data])

  useEffect(() => {
    setNetworkValue(searchParams.network || 'ethereum')
    switch (searchParams.network || chain?.name) {
      case 'ethereum' || 'Ethereum':
        setData({
          token: '0xETHER',
          oracle: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
        })
        break
      case 'polygon' || 'Polygon':
        setData({
          token: '0xETHER',
          oracle: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0'
        })
        break
      case 'celo' || 'CELO':
        setData({
          token: '0xETHER',
          oracle: ChainLinkContracts.CELO.CELO.oracle as Address
        })
        break
      case 'alfajores' || 'Alfajores':
        setData({
          token: '0xETHER',
          oracle: '0x022F9dCC73C5Fb43F2b4eF2EF9ad3eDD1D853946'
        })
        break
      case 'optimism' || 'OP Mainnet':
        setData({
          token: '0xETHER',
          oracle: '0x13e3Ee699D1909E989722E753853AE30b17e08c5'
        })
        break
      case 'arbitrum' || 'Arbitrum One':
        setData({
          token: '0xETHER',
          oracle: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612'
        })
        break
      default:
        setData({
          token: '0xETHER',
          oracle: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
        })
        break
    }
  }, [chain, searchParams])

  useEffect(() => {
    try {
      if (!data?.token || data.token === zeroAddress) return
      if (!currentPricing) return
      if (priceRef.current === null) return
      if (priceRef.current.value === '') return setPrice('0')
      setPrice(getPricing(priceRef.current.value as unknown as number))
    } catch (e) {
      console.error(e)
    }
  }, [currentPricing])

  useEffect(() => {
    if(price === 'No disponible') return
    if (parseFloat(price) >= 1 || parseFloat(price) === 0) {
      setIsCorrectAmmount({
        ...isCorrectAmmount,
        onlyAmmount: true,
        submit: false
      })
    } else {
      setIsCorrectAmmount({
        ...isCorrectAmmount,
        onlyAmmount: false,
        submit: true
      })
    }
  }, [price])

  useEffect(() => {
    async function sendTXN () {
      // console.debug('sending transaction')

      if (!triggerTxn || data?.token === zeroAddress) return
      // console.debug(data);
      if (txnError) {
        setTriggerTxn(false)
        console.error(txnErrorData)
        return
      }
      if (data?.token === '0xETHER') {
        if (!txnNativeLoading && !txnNativeSuccess) {
          try {
            setisSendingTXN(true)
            setShowModal(true)
            const data = await sendNativeTransaction?.()
            setisSendingTXN(false)
            setHash(data?.hash)
            return data
          } catch (e) {
            console.error(e)
            setisSendingTXN(false)
            setTriggerTxn(false)
          }
        } else if (
          !txnNativeLoading &&
          txnNativeSuccess &&
          address &&
          chain &&
          txnNativeData
        ) {
          setTriggerTxn(false)
        }
      } else {
        if (!decimalsLoading && decimalSuccess) {
          if (!txnLoading && !txnSuccess) {
            try {
              setisSendingTXN(true)
              setShowModal(true)
              const data = await sendTransaction?.()
              setHash(data?.hash)
              setisSendingTXN(false)
              return data
            } catch (e) {
              console.error(e)
              setTriggerTxn(false)
              setisSendingTXN(false)
            }
          } else if (!txnLoading && txnSuccess && address && chain && txnData) {
            setTriggerTxn(false)
          }
        }
      }
    }
    sendTXN()
  }, [
    triggerTxn,
    txnSuccess,
    txnLoading,
    txnData,
    decimalSuccess,
    decimalsLoading,
    data
  ])

  useEffect(() => {
    selectTokens(
      searchParams.network ? searchParams.network : (chain?.name as string)
    )
  }, [searchParams, chain])

  useEffect(() => {
    if (!isConnected || !searchParams.network) return
    // @ts-expect-error
    if (chain?.id !== chainIds[searchParams.network]) {
      chainSwitch(searchParams.network)
    }
  }, [switchNetwork, searchParams])

  useEffect(() => {
    if (
      isConnected &&
      searchParams.network &&
      chain?.name !== getChainName(searchParams.network)
    ) {
      setIsCorrectNetwork(false)
      chainSwitch(searchParams.network)
    } else if (isConnected && searchParams) {
      setIsCorrectNetwork(true)
    }
  }, [searchParams, chain])

  function getPricing (amount: number) {
    const currentPriceInUSD =
      //@ts-expect-error
      Number(currentPricing[0].result[1] as bigint) /
      //@ts-expect-error
      10 ** currentPricing[1].result

    const unFormatedPrice = (amount * currentPriceInUSD).toString()
    if (!unFormatedPrice.includes('.')) return unFormatedPrice
    const formatedPrice =
      unFormatedPrice.split('.')[0] +
      '.' +
      unFormatedPrice.split('.')[1].slice(0, 2)
    return formatedPrice
  }

  function getChainName (chain: string | undefined) {
    switch (chain) {
      case 'ethereum':
        return 'Ethereum'
      case 'polygon':
        return 'Polygon'
      case 'alfajores':
        return 'Alfajores'
      case 'celo':
        return 'Celo'
      case 'optimism':
        return 'OP Mainnet'
      case 'arbitrum':
        return 'Arbitrum One'
      default:
        return 'Ethereum'
    }
  }

  function selectTokens (chainname: string) {
    switch (chainname) {
      case 'ethereum' || 'Ethereum':
        setTokens([
          {
            name: 'ETH',
            contract: '0xETHER',
            oracle: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
          },
          {
            name: 'USDC',
            contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            oracle: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6'
          },
          {
            name: 'DAI',
            contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
            oracle: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9'
          },
          {
            name: 'USDT',
            contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            oracle: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D'
          }
        ])
        break
      case 'polygon' || 'Polygon':
        setTokens([
          {
            name: 'MATIC',
            contract: '0xETHER',
            oracle: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0'
          },
          {
            name: 'USDC',
            contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
            oracle: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7'
          },
          {
            name: 'DAI',
            contract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
            oracle: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D'
          },
          {
            name: 'USDT',
            contract: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
            oracle: '0x0A6513e40db6EB1b165753AD52E80663aeA50545'
          },
          {
            name: 'uWAT',
            contract: '0xdD875635231E68E846cE190b1396AC0295D9e577',
            oracle: '0x0A6513e40db6EB1b165753AD52E80663aeA50545'
          }
        ])
        break
      case 'celo' || 'Celo':
        setTokens([
          {
            name: 'Celo',
            contract: '0xETHER',
            oracle: ChainLinkContracts.CELO.CELO.oracle
          },
          {
            name: 'cUSD',
            contract: '0x765de816845861e75a25fca122bb6898b8b1282a',
            oracle: ChainLinkContracts.CELO.cUSD.oracle
          }
        ])
        break
      case 'alfajores' || 'Alfajores':
        setTokens([
          {
            name: 'Celo',
            contract: '0xETHER',
            oracle: '0x022F9dCC73C5Fb43F2b4eF2EF9ad3eDD1D853946'
          },
          {
            name: 'cUSD',
            contract: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
            oracle: '0x7bcB65B53D5a7FfD2119449B8CbC370c9058fd52'
          }
        ])
        break
      case 'optimism' || 'OP Mainnet':
        setTokens([
          {
            name: 'ETH',
            contract: '0xETHER',
            oracle: '0x13e3Ee699D1909E989722E753853AE30b17e08c5'
          },
          {
            name: 'USDC',
            contract: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
            oracle: '0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3'
          },
          {
            name: 'DAI',
            contract: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
            oracle: '0x8dBa75e83DA73cc766A7e5a0ee71F656BAb470d6'
          },
          {
            name: 'USDT',
            contract: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
            oracle: '0xECef79E109e997bCA29c1c0897ec9d7b03647F5E'
          }
        ])
        break
      case 'arbitrum' || 'Arbitrum One':
        setTokens([
          {
            name: 'ETH',
            contract: '0xETHER',
            oracle: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612'
          },
          {
            name: 'USDC',
            contract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            oracle: '0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3'
          },
          {
            name: 'DAI',
            contract: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
            oracle: '0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB'
          },
          {
            name: 'USDT',
            contract: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
            oracle: '0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7'
          }
        ])
        break
      default:
        setTokens([
          {
            name: 'None',
            contract: zeroAddress,
            oracle: zeroAddress
          }
        ])
        break
    }
  }

  async function chainSwitch (network: string | null) {
    switch (network) {
      case 'ethereum':
        switchNetwork?.(chainIds.ethereum)
        break
      // case 'Goerli':
      //   switchNetwork?.(chainIds.Goerli);
      //   break;
      case 'polygon':
        switchNetwork?.(chainIds.polygon)
        break
      case 'celo':
        switchNetwork?.(chainIds.celo)
        break
      case 'alfajores':
        switchNetwork?.(chainIds.Alfajores)
        break
      case 'optimism':
        switchNetwork?.(chainIds.optimism)
        break
      case 'arbitrum':
        switchNetwork?.(chainIds.arbitrum)
        break
      default:
        switchNetwork?.(chainIds.ethereum)
        break
    }
  }

  function getExplorerLink (chain: string | undefined): string {
    switch (chain) {
      case 'Ethereum':
        return 'tx/'
      case 'Goerli':
        return '/address/'
      case 'Alfajores':
        return '/tx/'
      case 'Polygon':
        return '/tx/'
      case 'Celo':
        return '/tx/'
      case 'OP Mainnet':
        return '/tx/'
      case 'Arbitrum One':
        return '/tx/'
      default:
        return '/tx/'
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPricing) return
    // console.debug({ currentPricing })

    const normalizedValue = e.target.value.replace(',', '.') // Reemplazar comas con puntos
    if (normalizedValue === '') return setPrice('0')
    if (data?.token === '0xdD875635231E68E846cE190b1396AC0295D9e577') {
      setPrice('No disponible')
      return
    }
    setPrice(getPricing(parseFloat(normalizedValue)))
  }

  const handleOnSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [contract, oracle] = e.target.value.split(':')
    setSelectValue(e.target.value)
    setData({
      token: contract as Address,
      oracle: oracle as Address,
      amount: data?.amount as number,
      chain: data?.chain as availableChains
    })
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    if (!isCorrectAmmount.onlyAmmount) {
      return
    }
    setIsCorrectAmmount({
      ...isCorrectAmmount,
      submit: false
    })
    const [contract, oracle] = e.target.token.value.split(':')
    const normalizedValue = e.target.amount.value.replace(',', '.')
    setData({
      token: contract,
      oracle,
      amount: parseFloat(normalizedValue),
      chain: chain?.name as availableChains
    })
    setTriggerTxn(true)
  }

  const handleOnCloseModal = () => {
    setShowModal(false)
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const handleOnChangeNetwork = (e: any) => {
    e.preventDefault()
    router.replace(`/donate?network=${e.target.network.value}`)
    chainSwitch(e.target.network.value)
    setIsChangingNetwork(false)
    setPrice('0')
    if (Tokens) setSelectValue(`${Tokens[0].contract}:${Tokens[0].oracle}`)
  }

  if (!isMounted) return null

  return (
    <main className='min-h-screen  bg-[#1B2731] w-full flex place-items-center place-content-center'>
      <Modal show={showModal}>
        {(isSendingTXN || awaitTxnLoading) && (
          <>
            <h1 className='text-xl font-bold text-center'>
              {t('modal.state.loading.title')}
            </h1>
            <div className='w-full items-center justify-center flex gap-4  flex-col'>
              <div
                className='inline-block h-24 w-24 font-bold text-[#43F07E] justify-center items-center animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                role='status'
              >
                <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                  Loading...
                </span>
              </div>
              <p className='text-sm text-center'>
                {t('modal.state.loading.description')}
              </p>
            </div>
          </>
        )}
        {(txnSuccess || txnNativeSuccess) && awaitTxn && !awaitTxnLoading && (
          <div className='flex flex-col justify-center items-center gap-4'>
            <Image src={checkIcon} alt='check-icon' />
            <h1 className='text-xl font-bold '>
              {t('modal.state.success.title')}
            </h1>
            <div className='flex flex-row w-full items-center justify-center gap-2'>
              <Link
                target='_blank'
                className='overflow-hidden p-2 border-[1px] border-solid text-sm rounded-md border-gray-500 h-full font-light'
                href={`${chain?.blockExplorers?.default.url}${getExplorerLink(
                  chain?.name
                )}${awaitTxn.transactionHash}`}
              >
                {awaitTxn.transactionHash.slice(0, 10)}...
              </Link>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(awaitTxn.transactionHash)
                }
                className='border-[1px] border-solid rounded-md h-full  border-gray-500 p-1'
              >
                <FontAwesomeIcon icon={faClone} />
              </button>
            </div>
            <button
              className='border-2 border-[#374151] px-4 py-2 rounded-md'
              onClick={handleOnCloseModal}
            >
              {t('modal.state.success.close')}
            </button>
          </div>
        )}
        {(txnError || txnNativeError || awaitTxnError) && (
          <div className='flex flex-col justify-center items-center gap-4'>
            <Image src={errorIcon} alt='check-icon' />
            <h1 className='text-sm font-bold text-center'>
              {t('modal.state.error.title')}
            </h1>
            <button
              className='border-2 border-[#374151] px-4 py-2 rounded-md'
              onClick={handleOnCloseModal}
            >
              {t('modal.state.error.close')}
            </button>
          </div>
        )}
      </Modal>
      <Modal show={isChangingNetwork}>
        <span className='flex flex-row justify-between items-center w-full'>
          <h2>{t('title')}</h2>
          <button
            className='text-black font-bold'
            onClick={() => setIsChangingNetwork(false)}
          >
            x
          </button>
        </span>
        <div className='border-b-[1px] border-[#4571E1] w-full' />
        <form
          onSubmit={handleOnChangeNetwork}
          className='flex flex-col gap-2 w-full justify-center items-center'
        >
          <label htmlFor='' className='text-sm w-full'>
            {t('whichNetwork')}
          </label>
          <select
            disabled={!switchNetwork}
            className='bg-[#4571E1] text-white  bg-opacity-40 py-3 px-2 rounded-lg w-full'
            name='network'
            id='network'
            value={networkValue}
            onChange={e => setNetworkValue(e.target.value)}
          >
            <option value='ethereum'>Ethereum</option>
            <option value='polygon'>Polygon</option>
            <option value='optimism'>Optimism</option>
            <option value='arbitrum'>Arbitrum</option>
            <option value='celo'>Celo</option>
          </select>
          <button
            className='w-full  px-5 py-2 bg-[#4571E1] text-white   font-bold rounded-lg'
            type='submit'
          >
            {t('buttons.whichNetwork')}
          </button>
        </form>
      </Modal>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className='p-3 gap-4 overflow-hidden relative max-w-md w-11/12 sm:w-10/12 md:9/12 bg-[#e3e3e3]  text-black rounded-lg flex flex-col justify-center items-center'
      >
        <h1 className='font-bold w-full text-start text-base'>
          {t('buttons.donate')}
        </h1>
        {(chain?.unsupported || !isConnected) && (
          <>
            <div className=' w-full border-b-[#797979] border-opacity-20 rounded-md border-[1px]' />
            <p className='text-start w-full text-xs opacity-80'>
              {chain?.unsupported
                ? t('messages.incorrectNetwork')
                : t('messages.connectWallet')}
            </p>
          </>
        )}
        <div className='flex w-full flex-col sm:flex-row gap-2 justify-center items-center'>
          {isConnected && !chain?.unsupported && (
            <button
              onClick={() => setIsChangingNetwork(true)}
              className='flex py-[6px] px-2 font-bold    border-2 rounded-lg bg-[#4571E1] text-white border-[#4571E1 flex-row gap-2 items-center justify-between  w-full'
            >
              {chain?.name}
              <svg
                fill='none'
                height='7'
                width='14'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2.5'
                  xmlns='http://www.w3.org/2000/svg'
                ></path>
              </svg>
            </button>
          )}
        </div>

        {isConnected ||
          (chain?.unsupported && (
            <div className=' w-full border-b-[#797979] border-opacity-20 rounded-md border-[1px]' />
          ))}
        {isConnected && !chain?.unsupported && (
          <form
            onSubmit={handleOnSubmit}
            className='flex w-full flex-col gap-2  justify-center items-center'
            action=''
          >
            <label htmlFor='token' className='text-sm  w-full'>
              {t('whichToken')}
            </label>
            <select
              disabled={!isCorrectNetwork}
              className='bg-[#4571E1] text-white  bg-opacity-40 py-2 px-2 rounded-lg w-full'
              name='token'
              id='token'
              value={selectValue}
              onChange={handleOnSelectChange}
            >
              {Tokens.map((token, index) => (
                <option key={index} value={`${token.contract}:${token.oracle}`}>
                  {token.name}
                </option>
              ))}
            </select>
            <label className='text-sm  w-full' htmlFor='amount'>
              {t('amount')}
            </label>
            <input
              ref={priceRef}
              className='bg-[#4571E1] text-white placeholder:text-white bg-opacity-40 py-2 px-2 rounded-lg w-full'
              type='text'
              name='amount'
              id='amount'
              step={0.00001}
              disabled={!isCorrectNetwork}
              placeholder='Cantidad'
              min={0.00001}
              inputMode='decimal'
              onChange={handleOnChange}
              required
            />
            <div className='flex max-w-full w-full flex-col items-center justify-center gap-5'>
              <div className=' min-h-fit  max-w-full relative flex w-full flex-col gap-2'>
                <p className=' text-sm w-full'>{t('messages.usdValue')}</p>
                <div className='overflow-hidden max-w-[80vw] whitespace-nowrap '>
                  <h1
                    className={`${
                      !isCorrectAmmount.onlyAmmount && 'text-red-700'
                    } font-bold text-4xl`}
                  >{`≈ $${price}`}</h1>
                  {isCorrectAmmount.submit && (
                    <p className='text-red-700'>{t('messages.minValue')}</p>
                  )}
                </div>
              </div>
              <button
                className={`flex flex-row gap-2 items-center justify-center px-5 transition-all duration-75 py-2 text-white bg-[#24B596] w-full rounded-lg ${
                  price === '0' && 'opacity-90'
                }`}
                type='submit'
                disabled={price === '0' || isSendingTXN || !isCorrectNetwork}
              >
                <span className='text-xl font-bold'>+</span>
                {t('buttons.donate')}
              </button>
            </div>
          </form>
        )}
      </motion.div>
      <Image
        className='absolute bottom-0 w-[100vw] left-0'
        src={BordeBottom}
        alt='Medellin'
      />
    </main>
  )
}

export default Page
