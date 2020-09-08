import { User } from "@prisma/client";

interface AuthPayload {
  token: string;
  user: User;
}

type SignInInput = {
  email: string;
  password: string;
};

export { AuthPayload, SignInInput };
