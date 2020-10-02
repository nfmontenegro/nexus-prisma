import { schema } from "nexus";

import { Context } from "../interfaces";
import { signUp, signIn } from "./resolvers/User";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: schema.stringArg(),
        lastname: schema.stringArg(),
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true })
      },
      resolve: async (_, args, ctx: NexusContext) => signUp(args, ctx)
    });
    t.field("signin", {
      type: "AuthPayload",
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true })
      },
      resolve: async (_, args, ctx: NexusContext) => signIn(args, ctx)
    });
  }
});
