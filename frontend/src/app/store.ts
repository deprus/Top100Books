import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/booksSlice";
import authReducer from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
