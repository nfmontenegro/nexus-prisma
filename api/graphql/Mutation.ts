import { schema } from "nexus";
import { Post, User } from "@prisma/client";

import { signUpQueryField, signInQueryField, updateUserQueryField } from "./query-fields/user";
import { createPostQueryField, deletePostQueryField } from "./query-fields/post";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signUp", signUpQueryField);
    t.field("signIn", signInQueryField);
    t.field("createPost", createPostQueryField);
    t.field("deletePost", { type: "String", ...deletePostQueryField });
    t.field("updateUser", updateUserQueryField);
  }
});
