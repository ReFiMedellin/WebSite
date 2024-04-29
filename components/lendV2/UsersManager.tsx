import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Address, zeroAddress } from 'viem';

function UsersManager() {
  const [currentUser, setCurrentUser] = useState<Address | undefined>(
    zeroAddress
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder='Search users'
          onChange={(e) => setCurrentUser(e.target.value as Address)}
        />
        
      </CardContent>
    </Card>
  );
}

export { UsersManager };
