import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";
import axios from "axios";

type UserType = {
  id: number;
  email: string;
  username: string;
};

type AuthState = {
  user: UserType | null;
  isLoading: boolean;
  error: string | null;
};

const userFromStorage = localStorage.getItem("user");

const initialState: AuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  isLoading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/signin", userData);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("An unknown error occurred during signing in");
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    userData: { email: string; username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/signUp", userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("An unknown error occurred during signin up");
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signout");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("An unknown error occurred during sign out");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      signIn.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isLoading = false;
    });
    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.error = null;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
