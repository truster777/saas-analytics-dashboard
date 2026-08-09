# Vantage — SaaS Analytics Dashboard

A B2B SaaS analytics dashboard for tracking subscription revenue, churn, and customer lifetime value. Built as a portfolio project demonstrating a full-stack data flow — from a relational schema to live, computed metrics on the frontend.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748)

## Features

- **Revenue metrics** - MRR, active subscriptions, churn rate, and estimated LTV, computed server-side from raw payment records
- **Customer directory** - searchable table of all accounts with plan, status, and revenue at a glance
- **Customer detail view** - full payment history per account
- **Dark mode** - system-aware theme switching
- **Responsive** - usable from a phone to a widescreen monitor
- **Loading states** - skeleton screens for every route while data streams in

## Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Database**: SQLite + Prisma ORM
- **UI**: Tailwind CSS, shadcn/ui
- **Charts**: Recharts

## Running locally

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data model

Three tables capture the shape of a subscription business:

- `Customer` - an account
- `Subscription` - a customer's plan, MRR, and status (active / canceled)
- `Payment` - individual billing events, the source of truth for revenue-over-time charts

Metrics on the dashboard aren't stored — they're derived on every request directly from `Subscription` and `Payment` rows, which keeps the numbers always consistent with the underlying data.