import { PrismaClient } from "@prisma/client";

interface Context {
  db: PrismaClient;
}

export { Context };
