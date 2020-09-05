interface IUser {
  uuid: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

type TUsersCreateInput = {
  uuid?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string | null;
};

export { IUser, TUsersCreateInput };
