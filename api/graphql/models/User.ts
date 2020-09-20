import { schema } from "nexus";

export const User = schema.objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("lastname");
    t.string("email", { nullable: false });
    t.string("password", { nullable: false });
    t.date("createdAt");
    t.date("updateAt");
    t.date("deletedAt");
  }
});
