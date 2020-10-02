import { PrismaClient } from "@prisma/client";

interface Context extends NexusContext {
  db: PrismaClient;
  userId?: string;
}

export { Context };
