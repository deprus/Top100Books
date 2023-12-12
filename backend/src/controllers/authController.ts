import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcryptUtils";
import { createUser, findByIdentifier } from "../services/userService";
import { generateToken } from "../utils/jwtUtils";
import { User } from "@prisma/client";
import { prisma } from "../server";

async function signUp(req: Request, res: Response) {
  const { email, username, password } = req.body;
  const user = await findByIdentifier(email || username);
  if (user) {
    res.status(401).json({
      message: "A user with this email or username already exists.",
    });
    return;
  }
  try {
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    await createUser(email, username, hashedPassword);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}

async function signIn(req: Request, res: Response) {
  const { email, username, password } = req.body;
  try {
    const user = await findByIdentifier(email || username);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email/username or password." });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email/username or password" });
    }
    generateToken(res, user.id);
    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
}

async function signOut(req: Request, res: Response) {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Signed out" });
}

async function fetchUsers(
  _req: Request,
  res: Response<User[] | { error: string }>
) {
  try {
    const users: User[] = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
}

export { signUp, signIn, signOut, fetchUsers };
