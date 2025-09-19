import { createSlice } from "@reduxjs/toolkit";
import { saveOrGetFromLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/event";

const initialState = {
    notificationsCount: 0,
    newMessageAlert: saveOrGetFromLocalStorage({key:NEW_MESSAGE_ALERT, get:true}) || []
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        incrementNotification: (state, action) => {
            state.notificationsCount += 1;
        },

        resetNotification: (state, action) => {
            state.notificationsCount = 0;
        },

        setNewMessageAlert: (state, action) => {
            const chatId = action.payload.chatId;
            const index = state.newMessageAlert.findIndex(item => item.chatId === chatId);

            if (index !== -1) {
                state.newMessageAlert[index].count += 1;
            }

            state.newMessageAlert.push({
                chatId,
                count: 1
            })
        },

        removeNewMessageAlert: (state, action) => {
            const chatId = action.payload.chatId;
            state.newMessageAlert = state.newMessageAlert.filter(item => item.chatId !== chatId);
        }
    }
})

export default chatSlice;

export const {
    incrementNotification,
    resetNotification,
    setNewMessageAlert,
    removeNewMessageAlert
} = chatSlice.actions;