import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";
import { User, UserCreateInput } from "@prisma/client";

import { SALT, APP_SECRET } from "../../config";
import { Context, AuthPayload } from "../../interfaces";

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

export { signUp };
