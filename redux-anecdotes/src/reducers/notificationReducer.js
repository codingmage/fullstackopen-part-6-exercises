import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        changeNotification(state, action) {
            return action.payload
        },
        resetNotification() {
            return ""
        },
    }
})

export const { changeNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer