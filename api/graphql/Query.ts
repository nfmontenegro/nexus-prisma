import { schema } from "nexus";

import { me, getAllUsers } from "./resolvers/User";
import { Context } from "../interfaces";

export const Query = schema.queryType({
  definition(t) {
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx: Context) => me(ctx)
    });
    t.field("users", {
      nullable: false,
      type: "User",
      args: {
        limit: schema.intArg(),
        offset: schema.intArg()
      },
      list: true,
      resolve: async (_, args, ctx: Context) => getAllUsers(args, ctx)
    });
  }
});
