import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { User, UserCreateInput } from "@prisma/client";

import { SALT, APP_SECRET } from "../../config";
import { Context, AuthPayload, SignInInput } from "../../interfaces";

const signUp = async (args: UserCreateInput, ctx: Context): Promise<AuthPayload> => {
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
};

const signIn = async (args: SignInInput, ctx: Context): Promise<AuthPayload> => {
  const { email, password } = args;

  const userValid: User | null = await ctx.db.user.findOne({ where: { email } });
  if (!userValid) throw new Error(`User ${email} doesn't exist!`);

  const isValidPassword = await compare(password, userValid.password);
  if (!isValidPassword) throw new Error(`Password not valid`);

  return {
    token: sign({ userId: userValid.id }, APP_SECRET as string, { expiresIn: "5m" }),
    user: userValid
  };
};

export { signUp, signIn };
