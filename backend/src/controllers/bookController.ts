import { Request, Response } from "express";
import { Book } from "@prisma/client";
import { prisma } from "../app";

export async function fetchBooks(
  _req: Request,
  res: Response<Book[] | { error: string }>
) {
  try {
    const books: Book[] = await prisma.book.findMany({
      include: { readBooks: true, toReadBooks: true },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
}

export async function updateBookStatus(req: Request, res: Response) {
  const { userId, bookId, newStatus } = req.body;

  if (
    typeof userId !== "number" ||
    typeof bookId !== "number" ||
    typeof newStatus !== "string"
  ) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    if (newStatus === "read") {
      await prisma.$transaction([
        prisma.read.create({ data: { userId, bookId } }),
        prisma.toRead.deleteMany({ where: { userId, bookId } }),
      ]);
    } else if (newStatus === "toRead") {
      await prisma.$transaction([
        prisma.toRead.create({ data: { userId, bookId } }),
        prisma.read.deleteMany({ where: { userId, bookId } }),
      ]);
    } else if (newStatus === "none") {
      await prisma.$transaction([
        prisma.read.deleteMany({ where: { userId, bookId } }),
        prisma.toRead.deleteMany({ where: { userId, bookId } }),
      ]);
    }

    res.status(200).json({ message: "Book status updated successfully" });
  } catch (error) {
    console.log("Error updating book status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the book status" });
  }
}

export async function fetchBookById(req: Request, res: Response) {
  const bookId = parseInt(req.params.bookId);

  if (!bookId) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        readBooks: true,
        toReadBooks: true,
      },
    });

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book" });
  }
}
