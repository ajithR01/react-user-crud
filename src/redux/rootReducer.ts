import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {userReducer} from "./slices/userSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
});
