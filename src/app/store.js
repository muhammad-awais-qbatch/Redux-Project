import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../page/postSlice";

export default configureStore({
  reducer: {
    post: postReducer,
  },
});
