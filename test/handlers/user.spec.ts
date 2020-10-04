import handler from "../../api/graphql/handlers/user";
import { users } from "./__mocks__/user";

const mockFindManyUser = jest.fn();
const mockFindOneUser = jest.fn();
const mockCreateUser = jest.fn();

const mockCompareBcrypt = jest.fn();
const mockHashBcrypt = jest.fn();

jest.mock("../../api/config", (): any => ({
  APP_SECRET: "X"
}));
jest.mock("bcryptjs", (): any => ({
  compare: (password: string, cryptPassword: string): boolean => mockCompareBcrypt(password, cryptPassword),
  hash: (): any => mockHashBcrypt()
}));

const errorMessage = "An error ocurred";
const context = {
  db: {
    user: {
      findMany: mockFindManyUser,
      findOne: mockFindOneUser,
      create: mockCreateUser
    }
  },
  userId: "35733704-1877-4937-8c39-fc18a7190b47"
};

describe("getAllUsers  #user handler", (): void => {
  const pagination = { limit: 1, offset: 1 };

  it("should return all users paginated", async (): Promise<void> => {
    mockFindManyUser.mockResolvedValue(users);
    const response = await handler.getAllUsers(pagination, context);
    expect(response).toBeTruthy();
    expect(response).toHaveProperty("data");

    expect(mockFindManyUser).toHaveBeenCalled();
    expect(mockFindManyUser).toHaveBeenCalledTimes(1);
    expect(mockFindManyUser).toHaveBeenCalledWith({ skip: 1, take: 1 });
  });

  it("should return error if failed", async (): Promise<void> => {
    try {
      mockFindManyUser.mockRejectedValue(errorMessage);
      await handler.getAllUsers(pagination, context);
    } catch (error) {
      expect(error).toEqual(errorMessage);
      expect(mockFindManyUser).toHaveBeenCalled();
      expect(mockFindManyUser).toHaveBeenCalledTimes(1);
      expect(mockFindManyUser).toHaveBeenCalledWith({ skip: 1, take: 1 });
    }
  });
});

describe("me #user handler", (): void => {
  it("should return user", async (): Promise<void> => {
    mockFindOneUser.mockResolvedValue(users.data.users[0]);
    const response = await handler.me(context);
    expect(response).toBeTruthy();
    expect(response).toHaveProperty("name");
    expect(response).toHaveProperty("lastname");

    expect(mockFindOneUser).toHaveBeenCalled();
    expect(mockFindOneUser).toHaveBeenCalledTimes(1);
    expect(mockFindOneUser).toHaveBeenCalledWith({ where: { id: context.userId } });
  });

  it("should return error if failed", async (): Promise<void> => {
    try {
      mockFindOneUser.mockRejectedValue(errorMessage);
      await handler.me(context);
    } catch (error) {
      expect(error).toEqual(errorMessage);
      expect(mockFindOneUser).toHaveBeenCalled();
      expect(mockFindOneUser).toHaveBeenCalledTimes(1);
      expect(mockFindOneUser).toHaveBeenCalledWith({ where: { id: context.userId } });
    }
  });
});

describe("signIn #user handler", (): void => {
  const credentials = { email: "x@gmail.com", password: "123xxx" };
  it("should signin user", async (): Promise<void> => {
    mockFindOneUser.mockResolvedValue(users.data.users[0]);
    mockCompareBcrypt.mockResolvedValue(true);

    const response = await handler.signIn(credentials, context);
    expect(response).toBeTruthy();
    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("user");

    expect(mockFindOneUser).toHaveBeenCalled();
    expect(mockFindOneUser).toHaveBeenCalledTimes(1);
    expect(mockFindOneUser).toHaveBeenCalledWith({ where: { email: credentials.email } });

    expect(mockCompareBcrypt).toHaveBeenCalled();
    expect(mockCompareBcrypt).toHaveBeenCalledTimes(1);
    expect(mockCompareBcrypt).toHaveBeenCalledWith(credentials.password, users.data.users[0].password);
  });

  it("should return error if email doesn't exist", async (): Promise<void> => {
    mockFindOneUser.mockResolvedValue(false);

    try {
      await handler.signIn(credentials, context);
    } catch (error) {
      expect(error.message).toEqual("User x@gmail.com doesn't exist!");
      expect(mockFindOneUser).toHaveBeenCalled();
      expect(mockFindOneUser).toHaveBeenCalledTimes(1);
      expect(mockFindOneUser).toHaveBeenCalledWith({ where: { email: credentials.email } });
      expect(mockCompareBcrypt).toHaveBeenCalledTimes(0);
    }
  });

  it("should return error if password is not valid", async (): Promise<void> => {
    mockFindOneUser.mockResolvedValue(users.data.users[0]);
    mockCompareBcrypt.mockResolvedValue(false);

    try {
      await handler.signIn(credentials, context);
    } catch (error) {
      expect(error.message).toEqual("Password not valid");
      expect(mockFindOneUser).toHaveBeenCalled();
      expect(mockFindOneUser).toHaveBeenCalledTimes(1);
      expect(mockFindOneUser).toHaveBeenCalledWith({ where: { email: credentials.email } });
      expect(mockCompareBcrypt).toHaveBeenCalled();
      expect(mockCompareBcrypt).toHaveBeenCalledTimes(1);
    }
  });
});

describe("signUp #user handler", (): void => {
  const credentials = { email: "x@gmail.com", password: "x" };
  it("should signin user", async (): Promise<void> => {
    mockFindOneUser.mockResolvedValue(null);
    mockCreateUser.mockResolvedValue(users.data.users[0]);
    mockHashBcrypt.mockResolvedValue("password");

    const response = await handler.signUp(credentials, context);
    expect(response).toBeTruthy();
    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("user");

    expect(mockFindOneUser).toHaveBeenCalled();
    expect(mockFindOneUser).toHaveBeenCalledTimes(1);
    expect(mockFindOneUser).toHaveBeenCalledWith({ where: { email: credentials.email } });

    expect(mockCreateUser).toHaveBeenCalled();
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith({ data: { ...credentials, password: "password" } });
  });

  it("should return error if user email  exist", async (): Promise<void> => {
    mockFindOneUser.mockResolvedValue(true);

    try {
      await handler.signUp(credentials, context);
    } catch (error) {
      expect(error.message).toEqual("User x@gmail.com already exist!");
      expect(mockFindOneUser).toHaveBeenCalled();
      expect(mockFindOneUser).toHaveBeenCalledTimes(1);
      expect(mockFindOneUser).toHaveBeenCalledWith({ where: { email: credentials.email } });

      expect(mockCreateUser).toHaveBeenCalledTimes(0);
      expect(mockHashBcrypt).toHaveBeenCalledTimes(0);
    }
  });
});
