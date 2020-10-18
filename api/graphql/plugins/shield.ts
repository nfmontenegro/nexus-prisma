import { rule, allow } from "nexus-plugin-shield";
import { verify } from "jsonwebtoken";

import { APP_SECRET } from "../../config";
import { TokenPayload } from "../../interfaces";

const getUserId = (context: any | null | undefined): any => {
  const headerAuthorization = context.req.headers.authorization;
  if (headerAuthorization) {
    const token = headerAuthorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET as string) as TokenPayload;
    context.userId = verifiedToken.userId;
    return verifiedToken && verifiedToken.userId;
  }
};

const isAuthenticated = rule()(
  async (parent, args, ctx, info): Promise<boolean> => {
    const userId = getUserId(ctx);
    return Boolean(userId);
  }
);

const rules = {
  Query: {
    users: isAuthenticated,
    me: isAuthenticated
  },
  Mutation: {
    signIn: allow,
    signUp: allow,
    createPost: isAuthenticated
  }
};

export { rules };
