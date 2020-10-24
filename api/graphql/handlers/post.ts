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

const deletePost = async (args: any, ctx: any): Promise<string> => {
  const { id: postId } = args;

  const postDeleted = await ctx.db.post
    .delete({
      where: {
        id: postId
      }
    })
    .catch((): string => {
      throw new Error(`Record ${postId} does not exist`);
    });

  return postDeleted.id;
};

export default { createPost, deletePost };
