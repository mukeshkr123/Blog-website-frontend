import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

// send the verification token to user
export const sendVerificationToken = createAsyncThunk(
  "user/send-verify-token",
  async (sendmail, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/generate-verify-email-token`,
        {},
        config
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

const acountVerificationreducer = createSlice({
  name: "users",
  initialState: {},
  extraReducers: (builder) => {
    //register
    builder.addCase(sendVerificationToken.pending, (state) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(sendVerificationToken.fulfilled, (state, action) => {
      state.loading = false;
      state.tokenSent = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(sendVerificationToken.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default acountVerificationreducer.reducer;
