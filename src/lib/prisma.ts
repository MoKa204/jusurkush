import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

function getDatabaseUrl(): string {
  // If explicitly set via ENV to postgres/mysql/etc., use it
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // On Vercel or production serverless environments:
  // /var/task is read-only. We copy the seeded SQLite database to writable /tmp
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    try {
      const tmpDbPath = path.join("/tmp", "dev.db");
      const possibleSources = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        path.resolve("./prisma/dev.db"),
        path.resolve("./dev.db"),
      ];

      if (!fs.existsSync(tmpDbPath)) {
        for (const src of possibleSources) {
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, tmpDbPath);
            console.log(`Copied database from ${src} to ${tmpDbPath}`);
            break;
          }
        }
      }

      if (fs.existsSync(tmpDbPath)) {
        return `file:${tmpDbPath}`;
      }
    } catch (err) {
      console.error("Error setting up Vercel SQLite /tmp database:", err);
    }
  }

  return process.env.DATABASE_URL || "file:./dev.db";
}

const dbUrl = getDatabaseUrl();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
