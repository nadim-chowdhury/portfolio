import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/services/baseApi";
import counterReducer from "@/store/slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
