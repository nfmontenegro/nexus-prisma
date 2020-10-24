import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { User, UserCreateInput } from "@prisma/client";

import { SALT, APP_SECRET } from "../../config";
import { AuthPayload, InputPagination, SignInInput } from "../../interfaces";

const signUp = async (args: UserCreateInput, ctx: any): Promise<AuthPayload> => {
  const userExist = await ctx.db.user.findOne({
    where: {
      email: args.email
    }
  });

  if (userExist) throw new Error(`User ${args.email} already exist!`);

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

const signIn = async (args: SignInInput, ctx: any): Promise<AuthPayload> => {
  const { email, password } = args;
  const userValid = await ctx.db.user.findOne({ where: { email } });
  if (!userValid) throw new Error(`User ${email} doesn't exist!`);

  const isValidPassword = await compare(password, userValid.password);
  if (!isValidPassword) throw new Error(`Password not valid`);

  return {
    token: sign({ userId: userValid.id }, APP_SECRET as string, { expiresIn: "30m" }),
    user: userValid
  };
};

const getAllUsers = async (args: InputPagination, ctx: any): Promise<User[]> => {
  const { limit = 10, offset = 1 } = args;
  return ctx.db.user.findMany({ skip: offset, take: limit });
};

const me = async (ctx: any): Promise<User | null> => ctx.db.user.findOne({ where: { id: ctx.userId } });

export default { signUp, signIn, getAllUsers, me };
