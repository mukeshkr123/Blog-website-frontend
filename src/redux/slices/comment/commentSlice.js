import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000";

// create a comment
export const createCommentAction = createAsyncThunk(
  "category/create",
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
        { postId: comment?.postId, description: comment?.description },
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

// delete a comment
export const deleteCommentAction = createAsyncThunk(
  "category/delete",
  async (commentId, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.delete(
        `${baseUrl}/api/comments/${commentId}`,
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

//slices
const commentSlice = createSlice({
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
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.commentCreated = undefined;
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      });

    //delete comment
    builder
      .addCase(deleteCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDeleted = action?.payload;
      })
      .addCase(deleteCommentAction.rejected, (state, action) => {
        state.commentDeleted = undefined;
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      });
  },
});

export default commentSlice.reducer;
