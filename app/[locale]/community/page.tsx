'use client';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import erc1155ABI from '@/constants/ABI/erc1155ABI.json';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fund } from '@/components/lendV2/Fund';
import { Lend } from '@/components/lendV2/Lend';
import { UserInfo } from '@/components/lendV2/UserInfo';
import { CurrentLends } from '@/components/lendV2/CurrentLends';
import { CurrentSignatures } from '@/components/lendV2/CurrentSignatures';
import { useGetUser } from '@/hooks/LendV2/useGetUser';
import { redirect, useRouter } from 'next/navigation';
import { Chains } from '@/constants/chains';
import { toast } from '@/components/ui/use-toast';
import { NetworkModal } from '@/components/loanPanel/NetworkModal';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useIsAdmin } from '@/hooks/LendV2/useIsAdmin';
import { useGlobalCurrency } from '@/context/CurrencyContext';

export default function Page() {
  const [selectedChain, setSelectedChain] = useState<
    keyof typeof Chains | null
  >(null);
  const { currency, setCurrency } = useGlobalCurrency();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [hasNft, setHasNft] = useState(false);
  const t = useTranslations('ExclusiveContent');
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const { push } = useRouter();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  useEffect(() => {
    const currentChain =
      chain?.id === Chains.celo
        ? 'celo'
        : chain?.id === Chains.optimism
        ? 'optimism'
        : chain?.id === Chains.polygon
        ? 'polygon'
        : chain?.id === Chains.sepolia
        ? 'sepolia'
        : chain?.id === Chains.arbitrum
        ? 'arbitrum'
        : null;
    setSelectedChain(currentChain);
    
    if (
      chain?.id !== Chains.celo &&
      chain?.id !== Chains.optimism &&
      chain?.id !== Chains.polygon &&
      chain?.id !== Chains.sepolia &&
      chain?.id !== Chains.arbitrum
    ) {
      setShowNetworkModal(true);
    } else {
      setShowNetworkModal(false);
    }
  }, [chain]);

  const handleCurrencyChange = async (currency: "COP" | "USD") => {
    setCurrency(currency);
    if (currency === "COP") {
      setSelectedChain("celo");
      const desiredChainId = Chains.celo;
      toast({
        title: 'Tip',
        description: 'Recuerda aceptar el cambio de red en tu billetera',
      });
      await switchNetworkAsync?.(desiredChainId);
    }
  };

  const handleNetworkChange = async (value: keyof typeof Chains) => {
    if (currency === "COP") return;

    const desiredChainId = Chains[value];
    toast({
      title: 'Tip',
      description: 'Recuerda aceptar el cambio de red en tu billetera',
    });
    await switchNetworkAsync?.(desiredChainId);

    const checkIfNetworkChanged = () => {
      if (chain?.id !== desiredChainId) {
        setTimeout(checkIfNetworkChanged, 1000);
      } else {
        setSelectedChain(value);
      }
    };

    checkIfNetworkChanged();
  };

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser(address!);
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rpc.ankr.com/polygon/')
  )

  const contract = new web3.eth.Contract(
    erc1155ABI,
    '0x6500dD04e67925A94975D787eF08E2d7786649D9'
  );
  async function getNFT() {
    try {
      const data = await contract.methods
        //TODO: FIX THIS TYPE
        // @ts-ignore
        .balanceOfBatch(Array(tokenIds.length).fill(address), tokenIds)
        .call();
      data &&
        data.forEach((nft: bigint) => {
          if (nft > BigInt(0)) {
            setHasNft(true);
          }
        });
    } catch (error) {
      return false;
    }
  }
  useEffect(() => {
    getNFT();
    if (!isMounted) setIsMounted(true);
  }, [address]);

  if (!isConnected && isMounted) return redirect('/');
  if (showNetworkModal) {
    return <NetworkModal onNetworkSelect={handleNetworkChange} />;
  }
  if (!hasNft) {
    return (
      <section className='flex p-20 flex-col relative first-bg justify-center items-center min-h-screen text-white text-center gap-4 bg-[#1B2731] w-full'>
        <h1 className='font-bold text-4xl lg:text-8xl'>
          {t('hasnotNFT.title')}
        </h1>
        <p className='text-sm md:text-lg lg:text-2xl font-light'>
          {t('hasnotNFT.description')}{' '}
          <Link
            className='hover:text-blue-700  transition-all ease-in-out font-bold'
            href={'https://bueno.art/refimedellin/refi-medellin-origin/tokens'}
            target='_blank'
          >
            {t('hasnotNFT.link')}
          </Link>
          <br />
        </p>
      </section>
    );
  }

  return (
    <main className='lend__panel px-5  text-white py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen flex justify-center items-center'>
      <div className='flex flex-row gap-4 w-full items-end'>
        <div className='flex flex-col gap-2  place-self-start'>
          <h4>Selecciona la moneda</h4>
          <Select
            defaultValue={currency}
            onValueChange={handleCurrencyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Moneda' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='USD'>USD</SelectItem>
              <SelectItem value='COP'>COP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-2  place-self-start'>
          <h4>Selecciona la red</h4>
          <Select
            key={selectedChain}
            defaultValue={selectedChain as string}
            onValueChange={handleNetworkChange}
            disabled={currency === "COP"}
          >
            <SelectTrigger>
              <SelectValue placeholder='Network' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='celo'>Celo</SelectItem>
              <SelectItem value='optimism'>Optimism</SelectItem>
              <SelectItem value='polygon'>Polygon</SelectItem>
              <SelectItem value='arbitrum'>Arbitrum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {!!isAdmin && !isAdminLoading && (
          <Button
            variant='outline'
            className='justify-self-end'
            onClick={() => push('lend-manager')}
          >
            Admin manager
          </Button>
        )}
      </div>
      <div
        style={{
          gridArea: 'info',
        }}
        className='flex flex-col gap-4  w-full h-full'
      >
        <UserInfo
          funded={(user as bigint[])?.[1]}
          quota={(user as bigint[])?.[0]}
          loading={isUserLoading}
          error={isUserError}
        />
        <Tabs defaultValue='lend'>
          <TabsList className='grid w-full grid-cols-2 '>
            <TabsTrigger value='fund'>Fund</TabsTrigger>
            <TabsTrigger value='lend'>Lend</TabsTrigger>
          </TabsList>
          <TabsContent value='fund'>
            <Fund />
          </TabsContent>
          <TabsContent value='lend'>
            <Lend />
          </TabsContent>
        </Tabs>
      </div>

      <CurrentSignatures />

      <CurrentLends />
    </main>
  );
}
