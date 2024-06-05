import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUserData = createAsyncThunk(
  "user/getUserData",
  async (token, { rejectWithValue }) => {
    try {
      // les headers doivent être en troisième argument pour axios.post

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {}, // Corps de la requête, vide si aucun corps n'est requis
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      // Utilisation correcte de rejectWithValue pour retourner les erreurs
      return rejectWithValue(
        error.response ? error.response.data : "Something went wrong"
      );
    }
  }
);

export const UpdateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Something went wrong"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      console.log("CLEAR USER");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "An error occurred";
      })
      .addCase(UpdateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(UpdateUserData.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
