import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

//send email
export const sendMailAction = createAsyncThunk(
  "email/send-mail",
  async (emailData, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/mail`,
        {
          to: emailData?.recipientEmail,
          subject: emailData?.subject,
          message: emailData?.message,
        },
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

const sendEmailSlices = createSlice({
  name: "users",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMailAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(sendMailAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sendMail = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(sendMailAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default sendEmailSlices.reducer;
