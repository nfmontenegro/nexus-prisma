import dotenv from "dotenv";
import { use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { shield } from "nexus-plugin-shield";

import { rules } from "./graphql/utils/shield";

dotenv.config();

use(
  shield({
    rules,
    options: {
      allowExternalErrors: true,
      debug: process.env.NODE_ENV === "dev" ? true : false
    }
  })
);

use(prisma());
