import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    users: "user",
  },
});

export default store;
