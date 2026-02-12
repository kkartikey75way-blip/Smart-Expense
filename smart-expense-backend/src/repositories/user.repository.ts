import { User } from "../models/user.model";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const createUser = async (data: any) => {
  return User.create(data);
};

export const saveRefreshToken = async (
  userId: string,
  refreshToken: string
) => {
  return User.findByIdAndUpdate(userId, { refreshToken });
};

export const findUserById = async (id: string) => {
  return User.findById(id);
};
