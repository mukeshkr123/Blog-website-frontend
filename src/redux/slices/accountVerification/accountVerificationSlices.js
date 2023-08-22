import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";

// action for redirect
const resetAccount = createAction("account/verify-reset");

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

//verify token
export const VerificationTokenAction = createAsyncThunk(
  "user/verify-token",
  async (token, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/verify-account`,
        { token },
        config
      );
      //dispatch
      dispatch(resetAccount());
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
    // verify account
    builder
      .addCase(VerificationTokenAction.pending, (state) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(resetAccount, (state, action) => {
        state.isVerified = true;
      });
    builder.addCase(VerificationTokenAction.fulfilled, (state, action) => {
      state.isVerified = false;
      state.loading = false;
      state.accountVerified = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(VerificationTokenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default acountVerificationreducer.reducer;
