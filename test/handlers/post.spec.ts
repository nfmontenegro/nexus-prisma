import { createPost, deletePost } from "../../api/graphql/resolvers/post";

const mockCreatePost = jest.fn();
const mockDeletePost = jest.fn();
const context = {
  db: {
    post: {
      create: mockCreatePost,
      delete: mockDeletePost
    }
  },
  userId: "35733704-1877-4937-8c39-fc18a7190b47"
};

const mockInputPost = { id: "1", title: "hi", content: "hi" };

describe("createPost #post resolver", (): void => {
  afterEach((): void => {
    mockCreatePost.mockClear();
    mockDeletePost.mockClear();
  });

  it("should return success when create a post", async (): Promise<void> => {
    mockCreatePost.mockResolvedValue({ ...mockInputPost, userId: context.userId });

    const response = await createPost(mockInputPost, context);

    expect(response).toHaveProperty("userId");
    expect(response).toHaveProperty("content");
    expect(response).toHaveProperty("title");
    expect(response.userId).toEqual("35733704-1877-4937-8c39-fc18a7190b47");

    expect(mockCreatePost).toHaveBeenCalled();
    expect(mockCreatePost).toHaveBeenCalledTimes(1);
    expect(mockCreatePost).toHaveBeenCalledWith({
      data: {
        ...mockInputPost,
        user: {
          connect: {
            id: context.userId
          }
        }
      }
    });
  });

  it("should return error if create post query failed", async (): Promise<void> => {
    try {
      mockCreatePost.mockRejectedValue("An error ocurred");
      await createPost(mockInputPost, context);
    } catch (error) {
      expect(error).toEqual("An error ocurred");
      expect(mockCreatePost).toHaveBeenCalled();
      expect(mockCreatePost).toHaveBeenCalledTimes(1);
    }
  });
});

describe("deletePost #post resolver", (): void => {
  it("should return success if the user is deleted", async (): Promise<void> => {
    mockDeletePost.mockResolvedValue({ id: "1" });

    const response = await deletePost(mockInputPost, context);

    expect(response).toEqual("1");

    expect(mockDeletePost).toHaveBeenCalled();
    expect(mockDeletePost).toHaveBeenCalledTimes(1);
    expect(mockDeletePost).toHaveBeenCalledWith({ where: { id: mockInputPost.id } });
  });

  it("should return error if delete post have a error", async (): Promise<void> => {
    try {
      mockDeletePost.mockRejectedValue("An error ocurred");
      await deletePost(mockInputPost, context);
    } catch (error) {
      expect(error).toEqual("An error ocurred");
      expect(mockDeletePost).toHaveBeenCalled();
      expect(mockDeletePost).toHaveBeenCalledTimes(1);
    }
  });
});
