import handler from "../../api/graphql/handlers/user";
import { users } from "./__mocks__/user";

const mockFindManyUser = jest.fn();

describe("getAllUsers  #user handler", () => {
  const errorMessage = "An error ocurred";
  const pagination = { limit: 1, offset: 1 };
  const context = {
    db: {
      user: {
        findMany: mockFindManyUser
      }
    }
  };

  it("should return all users paginated", async () => {
    mockFindManyUser.mockResolvedValue(users);
    const response = await handler.getAllUsers(pagination, context);
    expect(response).toBeTruthy();
    expect(response).toHaveProperty("data");

    expect(mockFindManyUser).toHaveBeenCalled();
    expect(mockFindManyUser).toHaveBeenCalledTimes(1);
    expect(mockFindManyUser).toHaveBeenCalledWith({ skip: 1, take: 1 });
  });

  it("should return error if failed", async () => {
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
