import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

// reducer
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.post(`&{baseUrl}/api/category`);
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const categorySlices = createSlice({
  name: "category",
  initialState: { title: "eweeeeeee" },
  reducers: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.appErr = false;
      state.serverErr = false;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.appErr = action.payload.message;
      } else {
        state.serverErr = "Something went wrong. Please try again later.";
      }
    });
  },
});

export default categorySlices.reducer;
