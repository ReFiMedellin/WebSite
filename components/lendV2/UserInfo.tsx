export { UserInfo };

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function UserInfo({
  quota,
  lendedAmount,
}: {
  quota: number;
  lendedAmount: number;
}) {
  return (
    <Card >
      <CardHeader>
        <CardTitle>User info</CardTitle>
        <CardDescription>
          Here you can see your info like current quota or lended total amount
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Current quota: {quota}</p>
        <p>Current lended amount: {lendedAmount}</p>
      </CardContent>
    </Card>
  );
}
