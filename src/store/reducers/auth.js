import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAdmin: false,
    loader: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userNotExists: (state) => {
            state.user = null;
            state.loader = false;
        },

        adminExists: (state, action) => {
            state.isAdmin = action.payload;
            state.loader = false;
        },
        adminNotExists: (state) => {
            state.isAdmin = null;
            state.loader = false;
        },
    }
})

export default authSlice;

export const { userExists, userNotExists, adminExists, adminNotExists } = authSlice.actions;