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
import { Select, SelectItem, SelectContent, SelectValue, SelectTrigger } from '../ui/select';

function ProtocolInfoV2() {
  const { data: tokens, loading: isLoadingTokens } = useGetTokens();
  const [tokenAddress, setTokenAddress] = useState<Address>(
    tokens?.tokens[0]?.tokenAddress ?? zeroAddress
  );
  const { data, isLoading } = useFundsV2(tokenAddress);
  console.debug({ data, isLoading, tokenAddress });

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
        {!isLoading && !isLoadingTokens && (
          <>
            <div className='flex flex-col gap-2 mb-4'>
              <label>Select a token</label>
              <Select
                key={tokenAddress}
                defaultValue={tokens?.tokens[0]?.tokenAddress ?? zeroAddress}
                onValueChange={(value) => setTokenAddress(value as Address)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens?.tokens.map(
                    (token: { tokenAddress: Address; symbol: string }) => (
                      <SelectItem
                        key={token.tokenAddress}
                        value={token.tokenAddress}
                      >
                        {token.symbol}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <p>Total funds: {formatUnits((data as bigint[])[0], 3)} </p>
            <p>Total interests: {formatUnits((data as bigint[])[1], 3)} </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export { ProtocolInfoV2 };
