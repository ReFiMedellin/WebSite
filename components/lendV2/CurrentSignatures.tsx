import React, { useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAccount } from 'wagmi';
import { useGetSignatureRequests } from '@/hooks/LendV2/useGetSignatureRequests';
import { Address } from 'viem';
import { Button } from '../ui/button';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';
import { useEthersSigner } from '@/hooks/eas-utils';
import { schemaUIDSepolia } from '@/constants';
import { Loader2 } from "lucide-react"


export type Request = {
  amount: number;
  to: string;
  currentSignatures: number;
};

function CurrentSignatures() {
  const { eas: EASContractAddress, schema } = useNetworkContractV2();
  const [loadingRequests, setLoadingRequests] = useState<number[]>([]);

  const { address } = useAccount();
  const signer = useEthersSigner();

  const { data, loading, error, refetch } = useGetSignatureRequests([
    address!.toLocaleLowerCase() as Address,
  ]);

  const handleAttest = async (
    amount: number,
    recipent: Address,
    index: number
  ) => {
    setLoadingRequests((prev) => [...prev, index]);

    try{

      const eas = new EAS(EASContractAddress);
      eas.connect(signer as any);
    const schemaEncoder = new SchemaEncoder(
      'uint256 amount,address recipent,uint16 index'
    );
    const encodedData = schemaEncoder.encodeData([
      { name: 'amount', value: amount * 1e3, type: 'uint256' },
      { name: 'recipent', value: recipent, type: 'address' },
      { name: 'index', value: index, type: 'uint16' },
    ]);
    const tx = await eas.attest({
      schema,
      data: {
        recipient: recipent,
        expirationTime: BigInt(0),
        revocable: false,
        data: encodedData,
      },
    });
    await tx.wait();
    refetch()
    setLoadingRequests((prev) => prev.filter((i) => i !== index));
  }catch(e){
    console.error(e);
    setLoadingRequests((prev) => prev.filter((i) => i !== index));
  }

  };

  return (
    <Card
      style={{
        gridArea: 'signatures',
      }}
      className='h-full w-full'
    >
      <CardHeader>
        <CardTitle>Pending signatures</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            🌟 In this section, you&apos;ll find the credit requests from your
            friends who have asked for your signature as a reference. Take a
            moment to review them and provide your signature if you support
            their request. They&apos;ll appreciate it! 🙌.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Credit Requested </TableHead>
              <TableHead>Friend Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading &&
              !error &&
              data.userQuotaRequests.map((request: any, key: number) => (
                <TableRow key={key}>
                  <TableCell className='font-medium'>
                    {request.amount}$ USD
                  </TableCell>
                  <TableCell>{request.user.id}</TableCell>
                  <TableCell>
                    <Button
                      disabled={loadingRequests.includes(request.id.split('-')[1])}
                      onClick={() =>
                        handleAttest(
                          parseFloat(request.amount),
                          request.user.id,
                          request.id.split('-')[1]
                        )
                      }
                    >
                      {loadingRequests.includes(request.id.split('-')[1]) && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Sign
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export { CurrentSignatures };
