import React, { useEffect, useState } from 'react';

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
import { useGetUserLends } from '@/hooks/LendV2/useGetUserLends';
import {
  Address,
  formatEther,
  formatUnits,
  parseUnits,
  zeroAddress,
} from 'viem';
import { getDaysBetween } from '@/functions/daysBetween';
import { usePayDebt } from '@/hooks/LendV2/usePayDebt';
import { useGetTokens } from '@/hooks/LendV2/useGetTokens';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/select';
import { useErc20Spendance } from '@/hooks/LendV2/useErc20Spendance';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';
import { useApproveErc20 } from '@/hooks/LendV2/useApproveErc20';
import { useErc20Decimals } from '@/hooks/LendV2/useErc20Decimals';
import { useGetCurrentLendInterests } from '@/hooks/LendV2/useGetCurrentLendInterests';

type Lend = {
  initialAmount: number;
  currentAmount: number;
  token: string;
  expectPaymentDue: number;
  latestDebtTimestamp: number;
};
function CurrentLends() {
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState<undefined | string>();
  const [currentLend, setCurrentLend] = useState(0);
  const { address } = useAccount();
  const { lendAddress } = useNetworkContractV2();
  const [token, setToken] = useState<Address>(zeroAddress);
  const { data: spendance } = useErc20Spendance(token, address!, lendAddress);
  const { data: decimals } = useErc20Decimals(token);
  const { data, isLoading, isError } = useGetUserLends(address!, page);
  const { writeAsync: payDebt } = usePayDebt();
  const { writeAsync: approve } = useApproveErc20(token);
  const {
    data: tokens,
    loading: isTokensLoading,
    error: isTokensError,
  } = useGetTokens();

  const {
    data: currentInterests,
    isError: isCurrentInterestsError,
    isLoading: isCurrentInterestsLoading,
  } = useGetCurrentLendInterests(currentLend);

  useEffect(() => {
    if (!isCurrentInterestsError && !isCurrentInterestsLoading) {
      //@ts-ignore
      setAmount(currentInterests.totalDebt);
      console.debug(
        { currentInterests },
        isCurrentInterestsError,
        isCurrentInterestsLoading
      );
    }
  }, [currentInterests]);

  const handleOnPayDebt = async (index: number) => {
    await payDebt({
      args: [parseFloat(amount ?? '0') * 1e3, token, index],
    });
  };

  const handleOnApproveSpendance = async () => {
    await approve({
      args: [lendAddress, parseUnits(amount!.toString(), decimals || 18)],
    });
  };

  console.debug(data);

  return (
    <Card
      style={{
        gridArea: 'lends',
      }}
      className='h-full w-full'
    >
      <CardHeader>
        <CardTitle>Your Current Lends</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Here you can see a list of your current & recent lends.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Initial amount</TableHead>
              <TableHead>Current amount</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Days remaining</TableHead>
            </TableRow>
          </TableHeader>
          {!isLoading && !isError && (
            <TableBody>
              {(data as any[]).map((lend, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {formatUnits(lend.initialAmount, 3)}
                  </TableCell>
                  <TableCell>{formatUnits(lend.currentAmount, 3)}</TableCell>
                  <TableCell>
                    {!isTokensLoading && !isTokensError
                      ? tokens.tokens.filter(
                          ({ tokenAddress }: { tokenAddress: Address }) =>
                            tokenAddress === lend.token.toLowerCase()
                        )[0]?.symbol || 'null'
                      : lend.token}
                  </TableCell>
                  <TableCell>
                    {getDaysBetween(Number(lend.expectPaymentDue))}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          onClick={() => {
                            setCurrentLend(index);
                            setToken(lend.token);
                          }}
                        >
                          Pay debt
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-80'>
                        <form className='grid gap-4'>
                          <div className='grid grid-cols-1 items-center gap-4'>
                            <Label htmlFor='token-select'>Amount</Label>
                            <Input
                              placeholder='100'
                              value={amount}
                              type='decimals'
                              step={0.001}
                              pattern='^\d*\.?\d*$'
                              onChange={(event) => {
                                const inputValue = event.target.value;
                                if (/^\d*\.?\d*$/.test(inputValue)) {
                                  setAmount(inputValue);
                                }
                              }}
                            />
                          </div>

                          {parseFloat(formatEther(spendance ?? BigInt(0))) >=
                          parseFloat(amount ?? '0') ? (
                            <Button
                              type='button'
                              onClick={() =>
                                handleOnPayDebt(index + (page - 1) * 10)
                              }
                            >
                              Pay debt
                            </Button>
                          ) : (
                            <Button
                              type='button'
                              onClick={handleOnApproveSpendance}
                            >
                              Approve spendance
                            </Button>
                          )}
                        </form>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {!isLoading && !isError && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total debt</TableCell>
                <TableCell className='text-right'>
                  {(data as any[]).reduce((acc, lend) => {
                    return acc + parseFloat(formatUnits(lend.currentAmount, 3));
                  }, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}

export { CurrentLends };
