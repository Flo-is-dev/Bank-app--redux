import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      userCredentials
    );
    const response = await request.data;
    // localStorage.setItem("user", JSON.stringify(response.body));
    return response;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    token: null,
    error: null,
  },
  reducers: {
    clearLoginData: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.token = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.body.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        if (action.error.message === "request failed with status code 401") {
          state.error = "Acces Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;
