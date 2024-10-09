"use client";

import MaxWidthWrapper from "@/components/MaxWithWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/back-end/trpc/client";

import Link from "next/link";

const Page = () => {
  const { data } = trpc.ticket.getTicket.useQuery();

  return (
    <MaxWidthWrapper>
      <div className="flex my-5">
        <Link
          className={buttonVariants({
            variant: "default",
          })}
          href={"/admin"}
        >
          Admin Dashboard
        </Link>
      </div>
      <div>
        <Table>
          <TableCaption>A list of .</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ? data.ticket.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
