import GMR from "graphql-merge-resolvers";

import User from "./queries/user";

const resolvers = GMR.merge([User]);

export default resolvers;
