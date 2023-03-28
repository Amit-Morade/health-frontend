import { createSlice } from "@reduxjs/toolkit";

export const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState: {
        details: null
    },
    reducers: {
        setUser: function(state, action) {
            state.details = action.payload; 
        }
    }
})

export const { setUser } = loggedInUserSlice.actions;

export const loggedInUserSelector = (state) => state.loggedInUser.details;

export default loggedInUserSlice.reducer