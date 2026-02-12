import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};
