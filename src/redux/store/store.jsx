import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlices";
import categoryReducer from "../slices/category/categorySlices";
import post from "../slices/posts/postSlices";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categoryReducer,
    post,
  },
});

export default store;
