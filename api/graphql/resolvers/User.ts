import { UserCreateInput } from "@prisma/client";

import { Context, AuthPayload, SignInInput } from "../../interfaces";
import handler from "../handlers/user";

const me = async (ctx: Context) => ctx.db.user.findOne({ where: { id: ctx.userId } });
const getAllUsers = async (ctx: Context) => ctx.db.user.findMany();
const signUp = async (args: UserCreateInput, ctx: Context): Promise<AuthPayload> => handler.signUp(args, ctx);
const signIn = async (args: SignInInput, ctx: Context): Promise<AuthPayload> => handler.signIn(args, ctx);

export { signUp, signIn, me, getAllUsers };
