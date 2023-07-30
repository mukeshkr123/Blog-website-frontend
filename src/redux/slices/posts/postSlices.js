import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:5000";

// Action to reset post state
const resetPost = createAction("category/reset");
const resetPostEdit = createAction("post/reset");

export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category?.label);
      formData.append("image", post?.image);

      const { data } = await axios.post(`${baseUrl}/api/posts`, formData);

      return data;
    } catch (error) {
      if (!error.response) throw error;

      // You can handle specific error statuses here and provide custom messages.
      return rejectWithValue(error.response.data);
    }
  }
);

//fetch all post
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts`);
      return data;
    } catch (error) {
      if (!error.response) throw error;

      // Handle specific error statuses here if needed.
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch a single post
export const fetchSinglePostsAction = createAsyncThunk(
  "post/detail",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);
      return data;
    } catch (error) {
      if (!error.response) throw error;

      // Handle specific error statuses here if needed.
      return rejectWithValue(error.response.data);
    }
  }
);

//add likes post
export const addLikesToPost = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/likes`,
        { postId },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;

      // Handle specific error statuses here if needed.
      return rejectWithValue(error.response.data);
    }
  }
);

//add dislike to the post
export const addDisLikesToPost = createAsyncThunk(
  "post/dislike",
  async (postId, { rejectWithValue, getState }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/dislikes`,
        { postId },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) throw error;
      // Handle specific error statuses here if needed.
      return rejectWithValue(error.response.data);
    }
  }
);

//update the  post
export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      );

      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);
//delete the  post
export const deletePostPostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.users?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/posts/${postId}`,
        config
      );

      dispatch(resetPostEdit());
      return data;
    } catch (error) {
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  isCreated: false,
  postCreated: null,
  postLists: [],
  likes: null,
  appErr: undefined,
  serverErr: undefined,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createpostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPost, (state) => {
        state.isCreated = true;
      })
      .addCase(createpostAction.fulfilled, (state, action) => {
        state.postCreated = action.payload;
        state.loading = false;
        state.isCreated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(createpostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })
      .addCase(fetchPostsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAction.fulfilled, (state, action) => {
        state.postLists = action.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchPostsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })
      .addCase(addLikesToPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLikesToPost.fulfilled, (state, action) => {
        state.likes = action.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addLikesToPost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })
      .addCase(addDisLikesToPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDisLikesToPost.fulfilled, (state, action) => {
        state.dislikes = action.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(addDisLikesToPost.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })
      .addCase(fetchSinglePostsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSinglePostsAction.fulfilled, (state, action) => {
        state.postDetails = action.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(fetchSinglePostsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })
      .addCase(updatePostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPostEdit, (state, action) => {
        state.isUpdated = true;
      })
      .addCase(updatePostAction.fulfilled, (state, action) => {
        state.postUpdated = action.payload;
        state.loading = false;
        state.isCreated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(updatePostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      })
      .addCase(deletePostPostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostPostAction.fulfilled, (state, action) => {
        state.postUpdated = action.payload;
        state.loading = false;
        state.isCreated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      })
      .addCase(deletePostPostAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
      });
  },
});

export default postSlice.reducer;
