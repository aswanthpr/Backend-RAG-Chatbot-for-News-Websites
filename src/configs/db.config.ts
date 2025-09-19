import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient | null = null;

// export const prismaClient = (): PrismaClient => {
//   if (!prisma) {
//     prisma = new PrismaClient({
//       log: ["query", "info", "warn", "error"],
//     });
//     console.log("✅ Prisma client initialized");
//   }
//   return prisma;
// };
 let prisma: PrismaClient | null = null;

export const prismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
    console.log("✅ Prisma client initialized");
  }
  return prisma;
};