import { Post } from "@prisma/client";

import { Context, CreatePostInput } from "../../interfaces";
import handler from "../handlers/post";

const createPost = async (args: CreatePostInput, ctx: Context): Promise<Post> => handler.createPost(args, ctx);

export { createPost };
