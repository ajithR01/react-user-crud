import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

import userModalReducer from "./slices/userModalSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userModal:userModalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
