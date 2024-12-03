import {configureStore } from "@reduxjs/toolkit";
import tasksReducer from './taskSlice.js';


export const store = configureStore({
    reducer : {
      tasks: tasksReducer,
    }
});
