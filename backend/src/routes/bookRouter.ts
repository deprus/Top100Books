import express from "express";
import {
  fetchBookById,
  fetchBooks,
  updateBookStatus,
} from "../controllers/bookController";

const router = express.Router();

router.get("/", fetchBooks);
router.get("/:bookId", fetchBookById);
router.patch("/updateStatus", updateBookStatus);

export default router;
