import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../page/postSlice";
import productReducer from "../page/productSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    product: productReducer,
  },
});
