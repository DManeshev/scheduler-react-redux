import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import calendarReducer from './calendarSlice';
import appointmentSlice from './eventSlice';

export default configureStore({
    reducer: {
        calendarView: calendarReducer,
        appointment: appointmentSlice
    },
    middleware: [thunk]
})