import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { User, UserCreateInput, UserUpdateInput, FindManyUserArgs } from "@prisma/client";

import { SALT, APP_SECRET } from "../../config";
import { AuthPayload, SignInInput, Context } from "../../interfaces";
import { ValidationError } from "../utils/custom-errors";

const signUp = async (args: UserCreateInput, ctx: Context): Promise<AuthPayload> => {
  const userExist = await ctx.db.user.findOne({
    where: {
      email: args.email
    }
  });

  if (userExist) throw new ValidationError(`User ${args.email} already exist!`);

  const password = await hash(args.password, SALT);
  const user: User = await ctx.db.user.create({
    data: {
      ...args,
      password
    }
  });
  return {
    token: sign({ userId: user.id }, APP_SECRET as string, { expiresIn: "5m" }),
    user
  };
};

const signIn = async (args: SignInInput, ctx: Context): Promise<AuthPayload> => {
  const { email, password } = args;

  const userValid = await ctx.db.user.findOne({ where: { email } });
  if (!userValid) throw new ValidationError(`User ${email} doesn't exist!`);

  const isValidPassword = await compare(password, userValid.password);
  if (!isValidPassword) throw new ValidationError(`Password not valid`);

  return {
    token: sign({ userId: userValid.id }, APP_SECRET as string, { expiresIn: "30m" }),
    user: userValid
  };
};

const getAllUsers = async (args: FindManyUserArgs, ctx: Context): Promise<User[]> => {
  const { skip = 10, take = 0 } = args;

  const users = await ctx.db.user.findMany({ skip, take });
  return users;
};

const me = async (ctx: any): Promise<User | null> => ctx.db.user.findOne({ where: { id: ctx.userId } });

const updateUser = async (args: UserUpdateInput, ctx: Context): Promise<User> => {
  const user = await ctx.db.user.update({
    where: { id: ctx.userId },
    data: args
  });

  return user;
};

export { signUp, signIn, getAllUsers, me, updateUser };
