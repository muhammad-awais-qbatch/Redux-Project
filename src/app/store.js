import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../page/PostSlice";
import ProductReducer from "../page/ProductSlice";

export default configureStore({
  reducer: {
    post: PostReducer,
    product: ProductReducer,
  },
});
