import { schema } from "nexus";

import { signUp } from "./resolvers/User";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: schema.stringArg(),
        lastname: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false })
      },
      resolve: async (_, args, ctx) => signUp(args, ctx)
    });
  }
});
