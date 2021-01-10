import { schema } from "nexus";

export const Post = schema.objectType({
  name: "Post",
  definition(t) {
    t.string("id", { nullable: false });
    t.string("title");
    t.string("content");
    t.string("userId", { nullable: false });
    t.field("createdAt", { type: "DateTime" });
    t.field("updateAt", { type: "DateTime" });
    t.field("deletedAt", { type: "DateTime" });
  }
});
