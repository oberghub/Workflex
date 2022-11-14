import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null
}

export const userSlice = createSlice({
    name : 'user_data',
    initialState,
    reducers : {
        userdata : (state, action) => {
            state.user = action.payload
        }
    }
})

export const { userdata } = userSlice.actions
export default userSlice.reducer