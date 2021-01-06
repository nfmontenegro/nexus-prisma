import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema, MockList } from "@graphql-tools/mock";
import { graphql } from "graphql";
import casual from "casual-browserify";

const schemaString = `
type AuthPayload {
  token: String
  user: User
}

scalar DateTime

scalar Json

type Mutation {
  createPost(content: String, title: String): Post
  deletePost(id: String!): String
  signIn(email: String!, password: String!): AuthPayload
  signUp(email: String!, lastname: String, name: String, password: String!): AuthPayload
}

type Post {
  content: String
  createdAt: DateTime
  deletedAt: DateTime
  id: String!
  title: String!
  updateAt: DateTime
  userId: String!
}

type Query {
  me: User
  posts(arguments: String, limit: Int, offset: Int): [Post!]!
  users(arguments: String, limit: Int, offset: Int): [User!]!
}

type User {
  createdAt: DateTime
  deletedAt: DateTime
  email: String!
  id: String
  lastname: String
  name: String
  password: String!
  updateAt: DateTime
}
`;

const mocks = {
  AuthPayload: (): any => ({
    token: casual.name,
    user: mocks.User
  }),
  User: (): any => ({
    id: casual.uuid,
    email: casual.email,
    name: casual.username,
    lastname: casual.last_name
  })
};

const schema = makeExecutableSchema({ typeDefs: schemaString });
const schemaWithMocks = addMocksToSchema({ schema, mocks });

const mutation = `
mutation  {
  signIn(email: "n3@gmail.com", password: "123") {
    token
    user {
      id,
      email,
      name,
      lastname
    }
  }
}`;

graphql(schemaWithMocks, mutation).then((result: any): any =>
  console.log("Got result", JSON.stringify(result, null, 2))
);
