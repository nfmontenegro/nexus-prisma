import { schema } from "nexus";

import { meQueryField, getAllUsersQueryField } from "./query-fields/user";
import { getAllPostsQueryField } from "./query-fields/post";

export const Query = schema.queryType({
  definition(t) {
    t.field("me", meQueryField);
    t.field("users", getAllUsersQueryField);
    t.field("posts", getAllPostsQueryField);
  }
});
