import { schema } from "nexus";
import * as PrismaSchema from "@prisma/client";

import { getAllPosts, createPost, deletePost } from "../resolvers/post";
import { Context } from "../../interfaces";
import { Post } from "../models/Post";

export const getAllPostsQueryField = {
  type: Post,
  nullable: false,
  args: {
    limit: schema.intArg(),
    offset: schema.intArg()
  },
  resolve: async (_: any, args: PrismaSchema.FindManyPostArgs, ctx: Context): Promise<PrismaSchema.Post[]> =>
    getAllPosts(args, ctx)
};

export const createPostQueryField = {
  type: Post,
  args: {
    title: schema.stringArg({ required: true }),
    content: schema.stringArg({ required: true })
  },
  resolve: async (
    _: any,
    args: PrismaSchema.PostCreateWithoutUserInput,
    ctx: Context
  ): Promise<PrismaSchema.Post> => createPost(args, ctx)
};

export const deletePostQueryField = {
  args: {
    id: schema.stringArg({ required: true })
  },
  resolve: async (_: any, args: PrismaSchema.PostWhereUniqueInput, ctx: Context): Promise<string> =>
    deletePost(args, ctx)
};
