import { Response } from "express";
import jwt from "jsonwebtoken";

function getJWTSecret(): string {
  const JWTSecret = process.env.JWT_SECRET as string;
  if (!JWTSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return JWTSecret;
}

export function generateToken(res: Response, userId: number) {
  const JWTSecret = getJWTSecret();
  const token = jwt.sign({ userId }, JWTSecret, { expiresIn: "14d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });
}

export function verifyToken(token: string) {
  const JWTSecret = getJWTSecret();
  try {
    return jwt.verify(token, JWTSecret);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
