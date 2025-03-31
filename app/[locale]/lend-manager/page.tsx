'use client';
import { AddToken } from '@/components/lendV2/AddToken';
import { DecreaseQuota } from '@/components/lendV2/DecreaseQuota';
import LendsManager from '@/components/lendV2/LendsManager';
import { ProtocolInfo } from '@/components/lendV2/ProtocolInfo';
import { QuotaManager } from '@/components/lendV2/QuotaManager';
import RequestManager from '@/components/lendV2/RequestManager';
import { UsersManager } from '@/components/lendV2/UsersManager';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Chains } from '@/constants/chains';
import { useIsAdmin } from '@/hooks/LendV2/useIsAdmin';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useGlobalCurrency } from '@/context/CurrencyContext';
import { ProtocolInfoV2 } from '@/components/lendV2/ProtocolInfoV2';
import { QuotaManagerV2 } from '@/components/lendV2/QuotaManagerV2';
import { DecreaseQuotaV2 } from '@/components/lendV2/DecreaseQuotaV2';
function Page() {
  const { data, isLoading } = useIsAdmin();
  const { currency, setCurrency } = useGlobalCurrency();
  const [selectedChain, setSelectedChain] = useState<
    keyof typeof Chains | null
  >(null);
  const { switchNetworkAsync } = useSwitchNetwork();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  const { chain } = useNetwork();
  const { push } = useRouter();
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
  }, [chain]);
  if (isLoading) {
    return (
      <main className='flex px-5  py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen justify-center items-center'>
        <h1 className='font-bold text-4xl text-white lg:text-8xl'>
          Loading...
        </h1>
      </main>
    );
  }
  // if (!data && chain?.name != 'sepolia') {
  //   return (
  //     <main className='flex px-5  py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen justify-center items-center'>
  //       <h1 className='font-bold text-4xl text-white lg:text-8xl'>
  //         Unauthorized
  //       </h1>
  //       ;
  //     </main>
  //   );
  // }
  const handleNetworkChange = async (value: keyof typeof Chains) => {
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
  console.debug({ currency });

  const handleCurrencyChange = async (currency: 'COP' | 'USD') => {
    setCurrency(currency);
    if (currency === 'COP') {
      setSelectedChain('celo');
      const desiredChainId = Chains.celo;
      toast({
        title: 'Tip',
        description: 'Recuerda aceptar el cambio de red en tu billetera',
      });
      await switchNetworkAsync?.(desiredChainId);
    }
  };

  return (
    <main className='lendManager px-5 text-white py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen justify-center items-center'>
      <div className='flex flex-row gap-4 w-full items-end'>
        <div className='flex flex-col gap-2  place-self-start'>
          <h4>Moneda</h4>
          <Select defaultValue={currency} onValueChange={handleCurrencyChange}>
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
          <h4>Red</h4>
          <Select
            key={selectedChain}
            defaultValue={selectedChain as string}
            onValueChange={handleNetworkChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Red' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='celo'>Celo</SelectItem>
              <SelectItem value='optimism'>Optimism</SelectItem>
              <SelectItem value='polygon'>Polygon</SelectItem>
              <SelectItem value='arbitrum'>Arbitrum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => push('/community')} variant='outline'>
          Lending dashboard
        </Button>
        {!!isAdmin && !isAdminLoading && (
          <Button variant='secondary' className='justify-self-end'>
            Admin manager
          </Button>
        )}
      </div>
      <div
        style={{
          gridArea: 'manager',
        }}
        className='flex flex-col gap-4  w-full h-full'
      >
        <LendsManager />
        <RequestManager />
        <UsersManager />
      </div>
      <div
        style={{
          gridArea: 'info',
        }}
        className='flex flex-col gap-4  w-full h-full'
      >
        {currency === 'COP' ? <ProtocolInfoV2 /> : <ProtocolInfo />}

        <Tabs defaultValue='increase'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='increase'>Increase Quota</TabsTrigger>
            <TabsTrigger value='decrease'>Decrease Quota</TabsTrigger>
            <TabsTrigger value='token'>Token manager</TabsTrigger>
          </TabsList>
          <TabsContent value='token'>
            <AddToken />
          </TabsContent>
          <TabsContent value='increase'>
            {currency === 'COP' ? <QuotaManagerV2 /> : <QuotaManager />}
          </TabsContent>
          <TabsContent value='decrease'>
            {currency === 'COP' ? <DecreaseQuotaV2 /> : <DecreaseQuota />}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default Page;
