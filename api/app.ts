import dotenv from "dotenv";
import { use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { shield, deny, allow } from "nexus-plugin-shield";

import { rules } from "./graphql/plugins/shield";

dotenv.config();

use(prisma());

use(
  shield({
    rules,
    options: {
      allowExternalErrors: true,
      debug: process.env.NODE_ENV === "dev" ? true : false
    }
  })
);
