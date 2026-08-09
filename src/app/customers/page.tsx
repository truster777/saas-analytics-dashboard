import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    include: { subscriptions: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-semibold tracking-tight">Customers</h1>
        <p className="text-muted-foreground text-sm">
          {customers.length} companies total
        </p>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => {
              // берём самую свежую подписку клиента 
              const subscription = customer.subscriptions[0];

              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Link
                      href={`/customers/${customer.id}`}
                      className="font-medium hover:underline"
                    >
                      {customer.companyName}
                    </Link>
                  </TableCell>
                  <TableCell className="capitalize">
                    {subscription?.plan ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={subscription?.status === "active" ? "default" : "secondary"}>
                      {subscription?.status ?? "no subscription"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    ${subscription?.mrr.toLocaleString("en-US") ?? 0}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}