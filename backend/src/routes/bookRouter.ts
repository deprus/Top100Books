import express from "express";
import fetchBooks from "../controllers/bookController";

const router = express.Router();

router.get("/", fetchBooks);

export default router;
