import { schema } from "nexus";
import { Post, User } from "@prisma/client";

import { AuthPayload, Context } from "../interfaces";
import { signUp, signIn, updateUser } from "./resolvers/user";
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
        title: schema.stringArg({ required: true }),
        content: schema.stringArg({ required: true })
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
    t.field("updateUser", {
      type: "User",
      args: {
        name: schema.stringArg(),
        lastname: schema.stringArg()
      },
      resolve: async (_, args, ctx: Context): Promise<User> => updateUser(args, ctx)
    });
  }
});
