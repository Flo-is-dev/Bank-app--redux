import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginSlice";
import UserReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    user: UserReducer,
  },
});

export default store;
