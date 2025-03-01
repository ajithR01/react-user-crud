import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

interface UserModalState {
    open : boolean,
    userData : User | null
}

const initialState : UserModalState = {
    open : false,
    userData : null
}

const userModalSlice = createSlice({
    name : 'userModal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<User | null>) => {
            state.open = true;
            state.userData = action.payload ?? null;
        },
        closeModal: (state) => {
            state.open = false,
            state.userData = null
        },
    },
});

export const {openModal, closeModal} = userModalSlice.actions;
export default userModalSlice.reducer;