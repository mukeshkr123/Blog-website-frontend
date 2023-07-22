import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:5000";

// create category action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        { title: category?.title },
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

// fetch categories action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch-categories",
  async (category, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.post(`${baseUrl}/api/category`, config);
      return data;
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
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state) => {
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
    // fetch the categories
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
      state.appErr = false;
      state.serverErr = false;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
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
