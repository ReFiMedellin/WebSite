'use client';
import { AddToken } from '@/components/lendV2/AddToken';
import { DecreaseQuota } from '@/components/lendV2/DecreaseQuota';
import LendsManager from '@/components/lendV2/LendsManager';
import { ProtocolInfo } from '@/components/lendV2/ProtocolInfo';
import { QuotaManager } from '@/components/lendV2/QuotaManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

function page() {
  return (
    <main className='lendManager px-5  py-32 gap-4 lg:px-20  bg-[#1B2731] min-h-screen flex justify-center items-center'>
      <ProtocolInfo />
      <LendsManager />
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
    </main>
  );
}

export default page;
