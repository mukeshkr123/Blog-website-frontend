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

// fetch all categories
export const fetchCategoriesAction = createAsyncThunk(
  "category/categories",
  async (_, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.get(`${baseUrl}/api/category`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// update
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        { title: category.title },
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

// delete
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
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

// fetch a single category
export const fetchCategoryAction = createAsyncThunk(
  "category/fetch",
  async (id, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.users?.userAuth;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };

      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// slices
const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    category: null,
    categoryList: [],
    appErr: null,
    serverErr: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      })
      .addCase(fetchCategoriesAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(fetchCategoriesAction.fulfilled, (state, action) => {
        state.categoryList = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      })
      .addCase(updateCategoryAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        state.updatedCategory = action.payload;
        state.loading = false;
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      })
      .addCase(deleteCategoryAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        state.deletedCategory = action.payload;
        state.loading = false;
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      })
      .addCase(fetchCategoryAction.pending, (state) => {
        state.loading = true;
        state.appErr = null;
        state.serverErr = null;
      })
      .addCase(fetchCategoryAction.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoryAction.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.appErr = action.payload.message;
        } else {
          state.serverErr = "Something went wrong. Please try again later.";
        }
      });
  },
});

export default categorySlice.reducer;
