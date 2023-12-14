import { Request, Response } from "express";
import { prisma } from "..";
import { Book } from "@prisma/client";

export default async function fetchBooks(
  _req: Request,
  res: Response<Book[] | { error: string }>
) {
  try {
    const books: Book[] = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
}
