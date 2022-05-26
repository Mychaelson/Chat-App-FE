import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducer/user";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
