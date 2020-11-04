import { schema } from "nexus";
import { Post } from "@prisma/client";

import { AuthPayload, Context } from "../interfaces";
import { signUp, signIn } from "./resolvers/user";
import { createPost, deletePost } from "./resolvers/post";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signUp", {
      type: "AuthPayload",
      args: {
        name: schema.stringArg(),
        lastname: schema.stringArg(),
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true })
      },
      resolve: async (_, args, ctx: Context): Promise<AuthPayload> => signUp(args, ctx)
    });
    t.field("signIn", {
      type: "AuthPayload",
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true })
      },
      resolve: async (_, args, ctx: Context): Promise<AuthPayload> => signIn(args, ctx)
    });
    t.field("createPost", {
      type: "Post",
      args: {
        title: schema.stringArg(),
        content: schema.stringArg()
      },
      resolve: async (_, args, ctx: Context): Promise<Post> => createPost(args, ctx)
    });
    t.field("deletePost", {
      type: "String",
      args: {
        id: schema.stringArg({ required: true })
      },
      resolve: async (_, args, ctx: Context): Promise<string> => deletePost(args, ctx)
    });
  }
});
