import { schema } from "nexus";

schema.objectType({
  name: "User",
  definition(t) {
    t.string("uuid");
    t.string("name");
    t.string("lastname");
    t.string("email");
    t.string("password");
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("users", {
      nullable: false,
      type: "User",
      list: true,
      resolve(_root, _args, ctx) {
        return ctx.db.users;
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDraft", {
      type: "User",
      args: {
        uuid: schema.stringArg({ required: true }),
        name: schema.stringArg({ required: true }),
        lastname: schema.stringArg({ required: true }),
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        ctx.db.users.push(args);
        return args;
      },
    });
  },
});
