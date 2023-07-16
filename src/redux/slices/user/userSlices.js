import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// create register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//user slices
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    appErr: null,
    serverErr: null,
    registerd: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.registerd = action.payload;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default userSlice.reducer;
