import { use } from "nexus";
import { schema } from "nexus";
import { prisma } from "nexus-plugin-prisma";

use(prisma());

schema.addToContext(() => {
  return {
    hello: "hi",
  };
});
