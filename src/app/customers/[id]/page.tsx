import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      subscriptions: {
        include: { payments: { orderBy: { paidAt: "desc" } } },
      },
    },
  });

  if (!customer) notFound();

  const subscription = customer.subscriptions[0];
  const allPayments = customer.subscriptions.flatMap((s) => s.payments);
  const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      <Link href="/customers" className="text-sm text-muted-foreground hover:underline">
        ← Back to customers
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-heading font-semibold tracking-tight">
            {customer.companyName}
          </h1>
          <p className="text-muted-foreground text-sm">{customer.email}</p>
        </div>
        {subscription && (
          <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
            {subscription.status}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2 min-h-11 flex items-start">
            <p className="text-sm text-muted-foreground">Plan</p>
          </CardHeader>
          <CardContent className="capitalize font-semibold text-lg">
            {subscription?.plan ?? "—"}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 min-h-11 flex items-start">
            <p className="text-sm text-muted-foreground">MRR</p>
          </CardHeader>
          <CardContent className="font-semibold text-lg">
            ${subscription?.mrr.toLocaleString("en-US") ?? 0}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 min-h-11 flex items-start">
            <p className="text-sm text-muted-foreground">Total paid</p>
          </CardHeader>
          <CardContent className="font-semibold text-lg">
            ${totalPaid.toLocaleString("en-US")}
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-3">Payment history</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {payment.paidAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>${payment.amount.toLocaleString("en-US")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}