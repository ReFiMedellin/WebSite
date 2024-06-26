'use client';
import { AddToken } from '@/components/lendV2/AddToken';
import { DecreaseQuota } from '@/components/lendV2/DecreaseQuota';
import LendsManager from '@/components/lendV2/LendsManager';
import { ProtocolInfo } from '@/components/lendV2/ProtocolInfo';
import { QuotaManager } from '@/components/lendV2/QuotaManager';
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

function Page() {
  const { data, isLoading } = useIsAdmin();

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
  if (!data && chain?.name != 'sepolia') {
    return (
      <main className='flex px-5  py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen justify-center items-center'>
        <h1 className='font-bold text-4xl text-white lg:text-8xl'>
          Unauthorized
        </h1>
        ;
      </main>
    );
  }
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

  return (
    <main className='lendManager px-5 text-white py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen justify-center items-center'>
      <div className='flex flex-row gap-4 w-full items-end'>
        <div className='flex flex-col gap-2  place-self-start'>
          <h4>Selecciona la red</h4>
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
        <UsersManager />
      </div>
      <div
        style={{
          gridArea: 'info',
        }}
        className='flex flex-col gap-4  w-full h-full'
      >
        <ProtocolInfo />

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
            <QuotaManager />
          </TabsContent>
          <TabsContent value='decrease'>
            <DecreaseQuota />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default Page;
