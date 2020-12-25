import { schema } from "nexus";

export const Post = schema.objectType({
  name: "Post",
  definition(t) {
    t.string("id", { nullable: false });
    t.string("title", { nullable: false });
    t.string("content");
    t.string("userId", { nullable: false });
    t.date("createdAt");
    t.date("updateAt");
    t.date("deletedAt");
  }
});
