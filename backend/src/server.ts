import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import bookRouter from "./routes/bookRouter";
import authRouter from "./routes/authRouter";
import authenticateToken from "./middleware/authenticateToken";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/books", bookRouter);
app.use("/api/auth", authRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
