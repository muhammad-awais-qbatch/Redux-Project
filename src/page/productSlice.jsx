import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    success: null,
    error: null,
    id: 0,
    total: 0,
  },
  reducers: {
    requestStarted(state) {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    requestFailed(state, error) {
      state.loading = false;
      state.error = error.payload;
      state.success = null;
    },
    requestSucceeded(state, action) {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
      state.success = true;
    },
    edits(state, action) {
      // console.log(action.payload);
      state.data = state.data.map((val) => {
        if (val.id === state.id) {
          return action.payload;
        } else {
          return val;
        }
      });
      // // console.log(state.data, state.id, state.success);
      state.id = 0;
      // console.log("Edit called.");
    },
    deletes(state, action) {
      console.log(action.payload, state.data);
      state.data = state.data.filter((item) => item.id != action.payload);
    },
    editId(state, action) {
      state.id = action.payload;
      console.log("EditId: ", action.payload);
    },
    getId(state) {
      let id;
      state.data.map((val, index) => {
        id = val.id;
      });
      state.id = id + 1;
      console.log(state.id);
    },
    addId(state, action) {
      state.data[state.id] = action.payload;
      state.id = 0;
    },
    setTotal(state, action) {
      state.total = action.payload
    }
  },
});

console.log(productSlice.actions, productSlice.reducer);
export const {
  requestStarted,
  requestFailed,
  requestSucceeded,
  edits,
  deletes,
  editId,
  addId,
  getId,
  setTotal
} = productSlice.actions;
export default productSlice.reducer;
