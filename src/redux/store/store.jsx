import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlices";
import categoryReducer from "../slices/category/categorySlices";
import post from "../slices/posts/postSlices";
import comment from "../slices/comment/commentSlice";
import sendMail from "../slices/email/emailSlices";

const store = configureStore({
  reducer: {
    users: userReducer,
    category: categoryReducer,
    post,
    comment,
    sendMail,
  },
});

export default store;
