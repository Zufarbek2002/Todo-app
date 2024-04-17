import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./todo/todoSlice";


const store = configureStore({
    reducer: {
        data: dataReducer
    }
})

export default store