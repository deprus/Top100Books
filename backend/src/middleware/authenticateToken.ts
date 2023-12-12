import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtUtils";
import { findById } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export default async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = verifyToken(token) as JwtPayload;
    const userId = decodedToken.userId as number;
    const user = await findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
}
