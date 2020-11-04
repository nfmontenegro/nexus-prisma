import { schema } from "nexus";
import { User } from "@prisma/client";

import { me, getAllUsers } from "./resolvers/user";
import { Context } from "../interfaces";

export const Query = schema.queryType({
  definition(t) {
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx: Context): Promise<User | null> => me(ctx)
    });
    t.field("users", {
      nullable: false,
      type: "User",
      args: {
        limit: schema.intArg(),
        offset: schema.intArg(),
        arguments: schema.stringArg()
      },
      list: true,
      resolve: async (_, args, ctx: Context): Promise<User[]> => getAllUsers(args, ctx)
    });
  }
});
