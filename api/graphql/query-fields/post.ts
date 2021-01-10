import { schema } from "nexus";
import { Post } from "@prisma/client";

import { getAllPosts } from "../resolvers/post";
import { Context, InputPagination } from "../../interfaces";

export const getAllPostsQueryField = {
  nullable: false,
  args: {
    limit: schema.intArg(),
    offset: schema.intArg(),
    arguments: schema.stringArg()
  },
  resolve: async (_: any, args: InputPagination, ctx: Context): Promise<Post[]> => getAllPosts(args, ctx)
};
