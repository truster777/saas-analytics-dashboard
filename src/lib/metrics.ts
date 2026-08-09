import { prisma } from "./prisma";

export async function getDashboardMetrics() {
  const subscriptions = await prisma.subscription.findMany();

  const active = subscriptions.filter((s) => s.status === "active");
  const canceled = subscriptions.filter((s) => s.status === "canceled");

  // MRR — сумма mrr всех активных подписок прямо сейчас
  const mrr = active.reduce((sum, s) => sum + s.mrr, 0);

  // churn rate — % отменённых от общего числа когда-либо созданных подписок
  const churnRate = subscriptions.length > 0
    ? (canceled.length / subscriptions.length) * 100
    : 0;

  // LTV прикидываем грубо: средний mrr активного клиента * условные 24 месяца жизни
  // (для реального продукта считали бы по факту оттока, но для витрины сойдёт эта оценка)
  const avgMrr = active.length > 0 ? mrr / active.length : 0;
  const ltv = avgMrr * 24;

  return {
    mrr,
    activeSubscriptions: active.length,
    churnRate,
    ltv,
    totalCustomers: subscriptions.length,
  };
}

// MRR по месяцам за последние N месяцев — для графика динамики
export async function getMrrTimeline(monthsBack = 6) {
  const payments = await prisma.payment.findMany({
    orderBy: { paidAt: "asc" },
  });

  const now = new Date();
  const buckets: Record<string, number> = {};

  // готовим пустые бакеты по месяцам заранее, чтобы месяцы без платежей не пропадали из графика
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets[key] = 0;
  }

  for (const payment of payments) {
    const d = new Date(payment.paidAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (key in buckets) buckets[key] += payment.amount;
  }

  return Object.entries(buckets).map(([month, revenue]) => ({ month, revenue }));
}