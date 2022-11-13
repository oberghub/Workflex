import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    user : null
}

export const userSlice = createSlice({
    name : 'user_data',
    initailState,
    reducers : {
        userdata : (state, action) => {
            state.user = action.payload
        }
    }
})

// export const { userdata } = userSlice.actions
export default userSlice.reducer