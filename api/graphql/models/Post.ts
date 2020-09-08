import { schema } from "nexus";

export const Post = schema.objectType({
  name: "Post",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("content");
    t.string("userId");
    t.date("createdAt");
    t.date("updateAt");
    t.date("deletedAt");
  }
});
