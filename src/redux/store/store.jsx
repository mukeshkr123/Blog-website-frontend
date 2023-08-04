import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlices";
import categoryReducer from "../slices/category/categorySlices";
import post from "../slices/posts/postSlices";
import comment from "../slices/comment/commentSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categoryReducer,
    post,
    comment,
  },
});

export default store;
