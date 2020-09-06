import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import dotenv from "dotenv";

dotenv.config();

use(prisma());

schema.addToContext(() => {
  return {
    hello: "hi"
  };
});
