import { Post, PostWhereUniqueInput, PostCreateWithoutUserInput, FindManyPostArgs } from "@prisma/client";

import { Context, InputPagination } from "../../interfaces";

const createPost = async (args: PostCreateWithoutUserInput, ctx: Context): Promise<Post> =>
  ctx.db.post.create({
    data: {
      ...args,
      user: {
        connect: {
          id: ctx.userId
        }
      }
    }
  });

const getAllPosts = async (args: FindManyPostArgs, ctx: Context): Promise<Post[]> => {
  const { skip, take } = args;
  const posts = await ctx.db.post.findMany({ take, skip });
  return posts;
};

const deletePost = async (args: PostWhereUniqueInput, ctx: Context): Promise<string> => {
  const { id: postId } = args;

  const postDeleted = await ctx.db.post.delete({
    where: {
      id: postId
    }
  });

  return postDeleted.id;
};

export { createPost, deletePost, getAllPosts };
