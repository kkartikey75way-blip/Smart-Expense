import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  refreshTokenService,
  logoutService
} from "../services/auth.service";



export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(
      req.body.name,
      req.body.email,
      req.body.password
    );

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const tokens = await loginUserService(
      req.body.email,
      req.body.password
    );

    res.json(tokens);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    await logoutService(userId);

    res.json({ message: "Logged out successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const tokens = await refreshTokenService(refreshToken);

    res.json(tokens);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

