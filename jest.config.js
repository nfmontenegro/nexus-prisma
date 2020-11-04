module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverageFrom: [
    "api/graphql/resolvers/*.ts",
    "!api/graphql/models/*/*.ts",
    "!api/graphql/plugins/*.ts",
    "!api/graphql/Mutation.ts",
    "!api/graphql/Query.ts"
  ],
  testMatch: ["<rootDir>/test/**/*.spec.(ts|js)"],
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage"
};
