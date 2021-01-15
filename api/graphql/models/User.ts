import { schema } from "nexus";

export default schema.objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("lastname");
    t.string("email", { nullable: false });
    t.string("password", { nullable: false });
    t.string("isActive");
    t.field("createdAt", { type: "DateTime" });
    t.field("updateAt", { type: "DateTime" });
    t.field("deletedAt", { type: "DateTime" });
  }
});
