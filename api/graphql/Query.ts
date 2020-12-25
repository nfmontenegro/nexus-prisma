import { schema } from "nexus";

import { meQueryField, getAllUsersQueryField } from "./query-fields/user";
import { getAllPostsQueryField } from "./query-fields/post";

export const Query = schema.queryType({
  definition(t) {
    t.field("me", { type: "User", ...meQueryField });
    t.field("users", { type: "User", list: true, ...getAllUsersQueryField });
    t.field("posts", { type: "Post", list: true, ...getAllPostsQueryField });
  }
});
