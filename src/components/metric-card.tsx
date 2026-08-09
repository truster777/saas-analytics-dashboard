import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-mono font-semibold tracking-[-0.03em] tabular-nums">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      </CardContent>
    </Card>
  );
}