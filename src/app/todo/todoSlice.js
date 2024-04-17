import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const fetchUser = createAsyncThunk('todo/fetchUser', () =>
    axios.get("http://localhost:3000/data").then(res => res.data).catch(err => err.message)
)

const dataSlice = createSlice({
    name: 'todo',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = '';
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload;
        })
    }
})

export const dataReducer = dataSlice.reducer;
export const dataActions = dataSlice.actions;