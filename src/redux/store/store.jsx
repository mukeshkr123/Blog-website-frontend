import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlices";
import categoryReducer from "../slices/category/categorySlices";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categoryReducer,
  },
});

export default store;
