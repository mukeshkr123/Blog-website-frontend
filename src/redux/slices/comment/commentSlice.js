import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import baseUrl from "../../../../utils/baseUrl";

const resetCommentAction = createAction("comment/reset");

// create a comment
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
  "comment/delete",
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

// update comment

export const updateCommentAction = createAsyncThunk(
  "comment/update",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.put(
        `${baseUrl}/api/comments/${comment?.id?.id}`,
        { description: comment?.description },
        config
      );
      // dispatch an action
      dispatch(resetCommentAction());
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// fetch comment detail

export const fetchSingleCommentAction = createAsyncThunk(
  "comment/fetch",
  async (Id, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/comments/${Id?.id}`,
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

    // update the comment
    builder
      .addCase(updateCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCommentAction, (state) => {
        state.isUpdated = true;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.commentUpdated = action?.payload;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.commentUpdated = undefined;
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      });

    // fetch the single comment

    builder
      .addCase(fetchSingleCommentAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.commentDetail = action?.payload;
      })
      .addCase(fetchSingleCommentAction.rejected, (state, action) => {
        state.commentDetail = undefined;
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
