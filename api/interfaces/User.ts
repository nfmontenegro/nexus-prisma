import { User } from "@prisma/client";

interface AuthPayload {
  token: string;
  user: User;
}

export { AuthPayload };
