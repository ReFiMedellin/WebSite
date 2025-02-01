import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useFunds } from '@/hooks/LendV2/useFunds';
import { formatUnits } from 'viem';

function ProtocolInfo() {
  const { data, isLoading } = useFunds();

  console.debug({data});

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

export { ProtocolInfo };
