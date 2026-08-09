"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function MrrChart({ data }: { data: { month: string; revenue: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-medium">Revenue over time</p>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" fontSize={12} tickLine={false} />
            <YAxis fontSize={12} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v) => [`$${v}`, "Revenue"]} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}