import React from 'react';

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

export type Request = {
  amount: number;
  to: string;
  currentSignatures: number;
};

function CurrentSignatures() {
  const { eas: EASContractAddress } = useNetworkContractV2();

  const { address } = useAccount();
  const signer = useEthersSigner();

  const { data, loading, error } = useGetSignatureRequests([
    address!.toLocaleLowerCase() as Address,
  ]);

  const handleAttest = async (
    amount: number,
    recipent: Address,
    index: number
  ) => {
    const eas = new EAS(EASContractAddress);
    eas.connect(signer as any);
    const schemaEncoder = new SchemaEncoder(
      'int256 amount,address recipent,uint16 index'
    );
    const encodedData = schemaEncoder.encodeData([
      { name: 'amount', value: amount, type: 'int256' },
      { name: 'recipent', value: recipent, type: 'address' },
      { name: 'index', value: index, type: 'uint16' },
    ]);
    const tx = await eas.attest({
      schema: schemaUIDSepolia,
      data: {
        recipient: recipent,
        expirationTime: BigInt(0),
        revocable: false,
        data: encodedData,
      },
    });
    await tx.wait();
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
                      onClick={() =>
                        handleAttest(
                          request.amount,
                          request.user.id,
                          request.id.split('-')[1]
                        )
                      }
                    >
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
