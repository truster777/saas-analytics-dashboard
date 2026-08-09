import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
 
// в dev-режиме Next.js пересоздаёт модули при каждом хот-релоаде -
// без глобального кеша плодили бы новые коннекты к базе на каждый save
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
 
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});
 
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;