import { UserCreateInput, User } from "@prisma/client";

import { Context, AuthPayload, SignInInput, InputPagination } from "../../interfaces";
import handler from "../handlers/user";

const me = async (ctx: Context): Promise<User | null> => ctx.db.user.findOne({ where: { id: ctx.userId } });
const getAllUsers = async (args: InputPagination, ctx: Context): Promise<User[]> => handler.getAllUsers(args, ctx);
const signUp = async (args: UserCreateInput, ctx: Context): Promise<AuthPayload> => handler.signUp(args, ctx);
const signIn = async (args: SignInInput, ctx: Context): Promise<AuthPayload> => handler.signIn(args, ctx);

export { signUp, signIn, me, getAllUsers };
