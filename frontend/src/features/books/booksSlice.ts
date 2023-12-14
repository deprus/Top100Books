import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type BookType = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  ratings: number[];
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
      const response = await axios.get<BookType[]>(
        "https://top100books-dedzitd50-deprus.vercel.app/api/books"
      );
      return response.data;
    } catch (error) {
      throw Error("Error fetching books");
    }
  }
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
      });
  },
});

export default booksSlice.reducer;
