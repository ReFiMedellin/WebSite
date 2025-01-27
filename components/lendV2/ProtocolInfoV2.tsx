import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Address, formatUnits, zeroAddress } from 'viem';
import { useFundsV2 } from '@/hooks/LendV2/useFundsV2';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';

function ProtocolInfoV2() {
  const { data: tokens } = useGetTokens();
  console.debug({tokens});
  const [tokenAddress, setTokenAddress] = useState<Address>(
    tokens?.tokens[0]?.tokenAddress ?? zeroAddress
  );
  const { data, isLoading } = useFundsV2(tokenAddress);

  console.debug({ data });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protocol info</CardTitle>
        <CardDescription>
          Here you can see the protocol Info like current funds or lended total
          amount
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isLoading && (
          <>
            <p>Total funds: {formatUnits((data as bigint[])[0], 3)} </p>
            <p>Total interests: {formatUnits((data as bigint[])[1], 3)} </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export { ProtocolInfoV2 };
