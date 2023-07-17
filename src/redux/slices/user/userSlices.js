import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//confi
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// create register action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
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

//Login Action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        userData,
        config
      );

      // save user into the local storage
      localStorage.setItem("userInfo", JSON.stringify(userData));
      return data;
    } catch (error) {
      if (!error?.message) {
        throw error;
      }
      return rejectWithValue(error?.response?.message);
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

    //login reducer
    builder
      .addCase(loginUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.userAuth = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
