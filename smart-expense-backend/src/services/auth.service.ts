import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  saveRefreshToken
} from "../repositories/user.repository";

import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt";

import { findUserById } from "../repositories/user.repository";
import { verifyRefreshToken } from "../utils/jwt";

export const refreshTokenService = async (refreshToken: string) => {

  if (!refreshToken) throw new Error("Refresh token missing");

  const decoded: any = verifyRefreshToken(refreshToken);

  const user = await findUserById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  // Token rotation (new tokens each refresh)
  const payload = { id: user._id, role: user.role };

  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    name,
    email,
    password: hashedPassword
  });
};

export const loginUserService = async (
  email: string,
  password: string
) => {

  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const payload = { id: user._id, role: user.role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await saveRefreshToken(user._id.toString(), refreshToken);

  return { accessToken, refreshToken };
};

export const logoutService = async (userId: string) => {
  const user = await findUserById(userId);
  if (user) {
    user.refreshToken = "";
    await user.save();
  }
};

export const getProfileService = async (userId: string) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};
