import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000";

// add comment
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/comments`,
        {
          description: comment?.description,
          postId: comment?.postId,
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

// create slices

const commentSlices = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentCreated = action?.payload;
        state.appError = undefined;
        state.serverErr = undefined;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.commentCreated = undefined;
        state.appError = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
  },
});

export default commentSlices.reducer;
