import { createSlice } from "@reduxjs/toolkit";
export const postSlice = createSlice({
  name: "post",
  initialState: {
    data: [],
    status: 0,
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    requestStarted(state) {
      // state.status = 0;
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    requestFailed(state, error) {
      // state.data = error.payload;
      // state.status = 0;
      state.loading = false;
      state.error = error.payload;
      state.success = null;
    },
    requestSucceeded(state, action) {
      // console.log(action.payload);
      state.data = action.payload;
      state.error = null;
      state.loading = false;
      state.success = true;
    },
    edits(state, action) {
      console.log(action.payload);
    },
    deletes(state, action) {
      console.log(action.payload);
      state.data = state.data.filter((item) => item.id != action.payload);
    },
  },
});

console.log(postSlice.actions, postSlice.reducer);
export const {
  requestStarted,
  requestFailed,
  requestSucceeded,
  edits,
  deletes,
} = postSlice.actions;
export default postSlice.reducer;
