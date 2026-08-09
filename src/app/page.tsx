import { getDashboardMetrics, getMrrTimeline } from "@/lib/metrics";
import { MetricCard } from "@/components/metric-card";
import { MrrChart } from "@/components/mrr-chart";

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();
  const timeline = await getMrrTimeline(6);

  return (
    <main className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of your subscription business
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="MRR"
          value={`$${metrics.mrr.toLocaleString("en-US")}`}
          hint="Monthly recurring revenue"
        />
        <MetricCard
          label="Active subscriptions"
          value={metrics.activeSubscriptions.toString()}
          hint={`of ${metrics.totalCustomers} total`}
        />
        <MetricCard
          label="Churn rate"
          value={`${metrics.churnRate.toFixed(1)}%`}
          hint="Canceled / total"
        />
        <MetricCard
          label="LTV"
          value={`$${metrics.ltv.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
          hint="Estimated, 24mo horizon"
        />
      </div>

      <MrrChart data={timeline} />
    </main>
  );
}