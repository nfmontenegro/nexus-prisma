import { schema } from "nexus";

import { me, getAllUsers } from "./resolvers/User";
import { Context } from "../interfaces";

export const Query = schema.queryType({
  definition(t) {
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx: Context) => {
        return me(ctx);
      }
    });
    t.field("users", {
      nullable: false,
      type: "User",
      list: true,
      resolve: async (_, _args, ctx: Context) => getAllUsers(ctx)
    });
  }
});
