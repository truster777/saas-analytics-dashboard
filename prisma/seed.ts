import { prisma } from "../src/lib/prisma";

const PLANS = [
  { name: "starter", mrr: 29 },
  { name: "pro", mrr: 99 },
  { name: "enterprise", mrr: 299 },
];

const COMPANIES = [
  "Nordwind Logistics", "Vertex Analytics", "Bluepeak Media", "Cascade Robotics",
  "Ironclad Security", "Lumen Health", "Orbit Commerce", "Solace Finance",
  "Granite Studios", "Pulseway Tech", "Ashford Consulting", "Rivermark Data",
  "Cobalt Systems", "Meridian Labs", "Frostbyte Cloud", "Halcyon Retail",
  "Wavecrest Digital", "Anchorpoint SaaS", "Novaspire Group", "Redshift Corp",
];

// рандомная дата в диапазоне последних monthsBack месяцев
function randomDate(monthsBack: number) {
  const now = new Date();
  const past = new Date();
  past.setMonth(now.getMonth() - monthsBack);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

async function main() {
  // чистим базу перед сидом, чтобы можно было гонять скрипт повторно
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.customer.deleteMany();

  for (const company of COMPANIES) {
    const customer = await prisma.customer.create({
      data: {
        companyName: company,
        email: `billing@${company.toLowerCase().replace(/\s+/g, "")}.com`,
        createdAt: randomDate(12),
      },
    });

    const plan = PLANS[Math.floor(Math.random() * PLANS.length)];
    // 75% активных подписок, остальные — отменённые (для churn rate)
    const isActive = Math.random() > 0.25;
    const startedAt = randomDate(10);

    const subscription = await prisma.subscription.create({
      data: {
        customerId: customer.id,
        plan: plan.name,
        mrr: plan.mrr,
        status: isActive ? "active" : "canceled",
        startedAt,
        canceledAt: isActive ? null : randomDate(2),
      },
    });

    // генерим 3-8 платежей по подписке 
    const paymentsCount = 3 + Math.floor(Math.random() * 6);
    for (let i = 0; i < paymentsCount; i++) {
      await prisma.payment.create({
        data: {
          subscriptionId: subscription.id,
          amount: plan.mrr,
          paidAt: randomDate(paymentsCount - i),
        },
      });
    }
  }

  console.log(`Засеяно ${COMPANIES.length} клиентов с подписками и платежами`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());