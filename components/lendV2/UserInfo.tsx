export { UserInfo };

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Address, formatEther, formatUnits, parseEther } from 'viem';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useState } from 'react';
import { useErc20Balance } from '@/hooks/LendV2/useErc20Balance';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import { useErc20Decimals } from '@/hooks/LendV2/useErc20Decimals';
import { useWithdraw } from '@/hooks/LendV2/useWithdraw';
function UserInfo({
  quota,
  funded,
  loading,
  error,
}: {
  quota: bigint;
  funded: bigint;
  loading: boolean;
  error: boolean;
}) {
  const { writeAsync } = useWithdraw();
  const [amount, setAmount] = useState<undefined | number>();
  const [token, setToken] = useState('');
  const { lendAddress } = useNetworkContractV2();


  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();
  const handleWithdraw = async () => {
    await writeAsync({
      args: [amount, token],
    });
  };

  return (
    <Card className='w-full h-full'>
      <CardHeader>
        <CardTitle>User info</CardTitle>
        <CardDescription>
          Here you can see your info like current quota or lended total amount
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading user info</p>
        ) : (
          <>
            <p>
              <strong>Total funded:</strong> {funded ? formatUnits(funded, 3) : '0'}
            </p>
            <p>
              <strong>Current quota: </strong>
              {quota ? formatUnits(quota, 3) : '0'}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>Withdraw</Button>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <form className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Options</h4>
                <p className='text-sm text-muted-foreground'>
                  Select a token to withdraw
                </p>
              </div>
              <div className='grid grid-cols-1 items-center gap-4'>
                <Label htmlFor='token-select'>Token</Label>
                <Select onValueChange={(value) => setToken(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a token to withdraw' />
                  </SelectTrigger>
                  <SelectContent>
                    {!isTokensLoading &&
                      !isTokensError &&
                      tokens?.tokens.map(
                        ({
                          tokenAddress,
                          symbol,
                        }: {
                          tokenAddress: Address;
                          symbol: string;
                        }) => (
                          <SelectItem key={tokenAddress} value={tokenAddress}>
                            {symbol}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                  {/* <p>
                    Token balance:{' '}
                    {formatUnits(balance || BigInt(0), decimals || 18)}$
                  </p> */}
                </Select>
              </div>
              <div className='grid grid-cols-1 items-center gap-4'>
                <Label htmlFor='token-select'>Amount</Label>
                <Input
                  placeholder='100'
                  value={amount}
                  onChange={(event) => {
                    if (event.target.value) {
                      setAmount(parseInt(event.target.value));
                    }
                  }}
                />
              </div>

              <Button type='button' onClick={handleWithdraw}>
                Withdraw funds
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
