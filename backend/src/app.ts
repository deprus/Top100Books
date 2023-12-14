import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import bookRouter from "./routes/bookRouter";
import authRouter from "./routes/authRouter";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: "https://top100books-frontend.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/books", bookRouter);
app.use("/api/auth", authRouter);

app.get("/test", (_req: Request, res: Response) => {
  res.send("Test");
});

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running...");
});

export default app;
