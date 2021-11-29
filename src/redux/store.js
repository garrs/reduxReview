// this page is our store
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    user: userReducer, // this is our store name: user
  },
  // reducer: {
  //   user: userReducer,
  //   post: postReducer,
  // },
});
