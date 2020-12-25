import { schema } from "nexus";
import { User } from "@prisma/client";

import { me, getAllUsers } from "../resolvers/User";
import { Context, InputPagination } from "../../interfaces";

export const meQueryField = {
  resolve: async (_: any, _args: any, ctx: Context): Promise<User | null> => me(ctx)
};

export const getAllUsersQueryField = {
  nullable: false,
  args: {
    limit: schema.intArg(),
    offset: schema.intArg(),
    arguments: schema.stringArg()
  },
  resolve: async (_: any, args: InputPagination, ctx: Context): Promise<User[]> => getAllUsers(args, ctx)
};
