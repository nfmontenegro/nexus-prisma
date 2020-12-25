import { Post } from "@prisma/client";

import { CreatePostInput } from "../../interfaces";

interface DeletePostArgument {
  id: string;
}

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

const getAllPosts = async (args: any, ctx: any): Promise<Post[]> => {
  const posts = await ctx.db.post.findMany({ ...args });
  return posts;
};

const deletePost = async (args: DeletePostArgument, ctx: any): Promise<string> => {
  const { id: postId } = args;

  const postDeleted = await ctx.db.post.delete({
    where: {
      id: postId
    }
  });

  return postDeleted.id;
};

export { createPost, deletePost, getAllPosts };
