import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/user";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      console.log('from user slice', action.payload)
      console.log('user data', state.users)
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    },
    deleteUser:(state, action:PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id)
    }
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
