import { schema } from "nexus";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";

import { SALT, APP_SECRET } from "../config";
import { User, UserCreateInput } from "@prisma/client";

export const Mutation = schema.mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: schema.stringArg(),
        lastname: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false })
      },
      resolve: async (_, args, ctx) => {
        const userExist = await ctx.db.user.findOne({
          where: {
            email: args.email
          }
        });

        if (userExist) throw new Error(`User ${args.email} already exist!`);

        const hashedPassword = await hash(args.password, SALT);

        const user: User = await ctx.db.user.create({
          data: { ...args, password: hashedPassword } as UserCreateInput
        });

        return {
          token: sign({ userId: user.id }, APP_SECRET as string, { expiresIn: "5m" }),
          user
        };
      }
    });
  }
});
