// lib/prisma.ts

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // <-- Required for the adapter's constructor
import { PrismaClient } from "../../generated/prisma/client";
// 1. Conditional adapter setup
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL not found in environment variables.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. The Singleton Function
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

// 3. Global Check (Prevents multiple connections on Next.js HMR)
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;