import { schema } from "nexus";

import { Context } from "../interfaces";
import { me, getAllUsers } from "./resolvers/User";

export const Query = schema.queryType({
  definition(t) {
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx: Context) => me(ctx)
    });
    t.field("users", {
      nullable: false,
      type: "User",
      list: true,
      resolve: async (_, _args, ctx: Context) => getAllUsers(ctx)
    });
  }
});
