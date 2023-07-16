import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlices";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
