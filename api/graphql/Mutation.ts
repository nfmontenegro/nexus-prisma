import { schema } from "nexus";
import { sign } from "jsonwebtoken";

/**
 * Maybe move interfaces and types to a different folder
 */
import { Users, UsersCreateInput } from "@prisma/client";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: schema.stringArg(),
        lastname: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (parent, args, ctx) => {
        const user: Users = await ctx.db.users.create({
          data: args as UsersCreateInput,
        });

        return {
          token: sign({ userId: user.uuid }, "123"),
          user,
        };
      },
    });
  },
});
