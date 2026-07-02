import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

import { PrismaClient } from "@/app/generated/prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const SSL_MODES = new Set(["require", "verify-ca", "verify-full"])

function sslFromUrl(url: string): { rejectUnauthorized: true } | undefined {
  try {
    const sslmode = new URL(url).searchParams.get("sslmode")
    return sslmode && SSL_MODES.has(sslmode) ? { rejectUnauthorized: true } : undefined
  } catch {
    return undefined
  }
}

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ""
  const ssl = sslFromUrl(url)
  const pool = new Pool({ connectionString: url, ...(ssl ? { ssl } : {}) })
  const adapter = new PrismaPg(pool)

  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ adapter })
      .$extends(withAccelerate()) as unknown as PrismaClient
  }

  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
