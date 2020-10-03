import { User } from "@prisma/client";

interface AuthPayload {
  token: string;
  user: User;
}

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

interface SignInInput {
  email: string;
  password: string;
}

export { AuthPayload, SignInInput, TokenPayload };
