import { schema } from "nexus";

export const Query = schema.queryType({
  definition(t) {
    t.field("users", {
      nullable: false,
      type: "User",
      list: true,
      resolve(_root, _args, ctx) {
        return ctx.db.users.findMany();
      },
    });
  },
});
