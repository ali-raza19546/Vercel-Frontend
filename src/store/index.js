import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./TanStackSlice";

const postStore = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer, // React New Tool
  },
  middleware: (fetchDefault) => fetchDefault().concat(postApi.middleware),
});

export default postStore;
