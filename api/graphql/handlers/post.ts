import { Post } from "@prisma/client";

import { CreatePostInput } from "../../interfaces";

const createPost = async (args: CreatePostInput, ctx: any): Promise<Post> => {
  const post = await ctx.db.post.create({
    data: {
      ...args,
      user: {
        connect: {
          id: ctx.userId
        }
      }
    }
  });
  return post;
};

export default { createPost };
