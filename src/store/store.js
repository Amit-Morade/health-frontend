import { configureStore } from "@reduxjs/toolkit"
import loggedInUserReducer from '../features/loggedInUserSlice'

export default configureStore({
    reducer: {
        loggedInUser: loggedInUserReducer,
    }
})