import { User } from "@prisma/client";

// tslint:disable-next-line: interface-over-type-literal
type AuthPayload = {
  token: string;
  user: User;
};

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

interface SignInInput {
  email: string;
  password: string;
}

interface SignUpInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export { AuthPayload, SignInInput, TokenPayload, SignUpInput };
