import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LendStatus, useGetAllLends } from "@/hooks/LendV2/useGetAllLends";
import { formatUnits } from "viem";
import { Button } from "@/components/ui/button";
import abreviarHash from "@/functions/abreviateHash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiBroomBold } from "react-icons/pi";
import { RequestStatus } from "@/hooks/LendV2/useGetAllRequests";

function LendsManager() {
  const [page, setPage] = useState(0);
  const [lendStatus, setLendStatus] = useState(LendStatus.ACTIVE);
  const {
    data,
    loading: isLoading,
    error: isError,
  } = useGetAllLends(page, lendStatus);
  return (
    <Card
      style={{
        gridArea: "lends",
      }}
      className="align-top w-full"
    >
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Current requests</CardTitle>

          <Select
            onValueChange={(value: LendStatus) => setLendStatus(value)}
            defaultValue={LendStatus.ACTIVE}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={RequestStatus.ALL}>All request</SelectItem>
                <SelectItem value={RequestStatus.SIGNED}>
                  Signed requests
                </SelectItem>
                <SelectItem value={RequestStatus.COMPLETED}>
                  Completed requests
                </SelectItem>
                <SelectItem value={LendStatus.ACTIVE}>Active loans</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of the whole requests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Signatures / References</TableHead>
            </TableRow>
          </TableHeader>
          {!isLoading && !isError && (
            <TableBody>
              {(data.lendings as any[]).map((lend, key) => (
                <TableRow key={key}>
                  <TableCell className="flex flex-row gap-2 items-center ">
                    <Button
                      className="w-8 h-8"
                      variant={"outline"}
                      onClick={() => navigator.clipboard.writeText(lend.lender)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </Button>
                    {abreviarHash(lend.lender)}
                  </TableCell>
                  <TableCell className="font-medium">NA / NA</TableCell>
                  <TableCell className="font-medium">NA / NA</TableCell>
                  <TableCell className="flex flex-row gap-2 items-center ">
                    <Button className="p-2" variant={"outline"}>
                      <PiBroomBold className="text-xl text-teal-950" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </CardContent>
      <CardFooter className="flex flex-row gap-4">
        <Button
          disabled={isLoading || !data || data.lendings.length === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>

        <Button disabled={page == 0} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LendsManager;
