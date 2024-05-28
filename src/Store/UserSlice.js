import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetUserData = createAsyncThunk(
  "user/getUserData",
  async (token, { rejectWithValue }) => {
    try {
      // les headers doivent être en troisième argument pour axios.post
      // Le deuxième argument doit être le corps de la requête, qui, dans ce cas, est vide ou approprié selon l'API.
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {}, // Corps de la requête, vide si aucun corps n'est requis
        { headers: { Authorization: `Bearer ${token}` } } // Headers bien positionnés
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
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
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
