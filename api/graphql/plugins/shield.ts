import { rule, allow, not } from "nexus-plugin-shield";
import { verify } from "jsonwebtoken";

import { APP_SECRET } from "../../config";

const getUserId = (context: any | null | undefined) => {
  const headerAuthorization = context.req.headers.authorization;
  if (headerAuthorization) {
    const token = headerAuthorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET as string);
    return verifiedToken && verifiedToken.userId;
  }
};

const isAuthenticated = rule({ cache: "contextual" })(async (parent, args, ctx, info) => {
  const userId: boolean = getUserId(ctx);
  return Boolean(userId);
});

const rules = {
  Query: {
    users: isAuthenticated
  },
  Mutations: {
    signin: allow,
    signup: allow
  }
};

export { rules };
