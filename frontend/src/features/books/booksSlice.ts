import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";

export type BookType = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  readBooks: Array<{ id: number; userId: number; bookId: number }>;
  toReadBooks: Array<{ id: number; userId: number; bookId: number }>;
};

type BooksState = {
  books: BookType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const fetchBooks = createAsyncThunk<BookType[]>(
  "books/fetchBooks",
  async () => {
    try {
      const response = await axiosInstance.get<BookType[]>("books");
      return response.data;
    } catch (error) {
      throw Error("Error fetching books");
    }
  },
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId: number) => {
    try {
      const response = await axiosInstance.get<BookType>(`books/${bookId}`);
      return response.data;
    } catch (error) {
      throw Error("Error fetching the book");
    }
  },
);

const initialState: BooksState = {
  books: [],
  status: "idle",
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error fetching books";
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        const index = state.books.findIndex((b) => b.id === action.payload.id);
        state.books[index] = action.payload;
      });
  },
});

export default booksSlice.reducer;
