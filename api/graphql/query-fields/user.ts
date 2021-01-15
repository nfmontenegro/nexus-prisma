import { schema } from "nexus";
import * as PrismaSchema from "@prisma/client";

import { me, getAllUsers, signUp, signIn, updateUser } from "../resolvers/user";
import { AuthPayload, Context, SignInInput } from "../../interfaces";

import UserModel from "../models/User";
import AuthPayloadModel from "../models/AuthPayload";

export const meQueryField = {
  type: UserModel,
  resolve: async (_: any, _args: any, ctx: Context): Promise<PrismaSchema.User | null> => me(ctx)
};

export const getAllUsersQueryField = {
  type: UserModel,
  args: {
    skip: schema.intArg(),
    take: schema.intArg()
  },
  resolve: async (_: any, args: PrismaSchema.FindManyUserArgs, ctx: Context): Promise<PrismaSchema.User[]> =>
    getAllUsers(args, ctx)
};

export const signUpQueryField = {
  type: AuthPayloadModel,
  args: {
    name: schema.stringArg(),
    lastname: schema.stringArg(),
    email: schema.stringArg({ required: true }),
    password: schema.stringArg({ required: true })
  },
  resolve: async (_: any, args: PrismaSchema.UserCreateInput, ctx: Context): Promise<AuthPayload> =>
    signUp(args, ctx)
};

export const signInQueryField = {
  type: AuthPayloadModel,
  args: {
    email: schema.stringArg({ required: true }),
    password: schema.stringArg({ required: true })
  },
  resolve: async (_: any, args: SignInInput, ctx: Context): Promise<AuthPayload> => signIn(args, ctx)
};

export const updateUserQueryField = {
  type: UserModel,
  args: {
    name: schema.stringArg(),
    lastname: schema.stringArg()
  },
  resolve: async (_: any, args: PrismaSchema.UserUpdateInput, ctx: Context): Promise<PrismaSchema.User> =>
    updateUser(args, ctx)
};
